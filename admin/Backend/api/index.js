const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { supabase } = require('../lib/supabase');

const authRoutes = require('../routes/auth');
const contentRoutes = require('../routes/content');
const testimonialRoutes = require('../routes/testimonials');
const blobRoutes = require('../routes/blob');

const app = express();

app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  try {
    console.debug('req.socket present:', !!req.socket, 'typeof req.setTimeout:', typeof req.setTimeout);

    if (req && req.socket && typeof req.socket.setTimeout !== 'function') {
      req.socket.setTimeout = function (/* ms */) {
      };
    }

    if (typeof req.setTimeout !== 'function') {
      req.setTimeout = function (ms, cb) {
        if (typeof ms === 'function') {
          cb = ms;
          ms = 0;
        }
        if (typeof cb === 'function') {
          try { setTimeout(cb, ms || 0); } catch (e) { console.warn('req.setTimeout fallback failed', e); }
        }
        return req;
      };
    }
  } catch (e) {
    console.warn('Error applying req.setTimeout guard:', e);
  }
  next();
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

let didSeedAdmin = false;
async function ensureAdminSeeded() {
  if (didSeedAdmin) return;
  const seedPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!seedPassword) return;

  const username = 'admin';
  const { data: existingArr, error: existingError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .limit(1);
  if (existingError) {
    console.error('Supabase check admin error:', existingError.message);
  }
  const existingData = existingArr && existingArr[0];
  if (existingData) {
    didSeedAdmin = true;
    return;
  }

  const hashed = await bcrypt.hash(seedPassword, 10);
  const newUser = {
    id: uuidv4(),
    username,
    password: hashed,
    role: 'admin',
    created_at: new Date().toISOString(),
  };
  const { error: insertError } = await supabase.from('users').insert(newUser);
  if (insertError) {
    console.error('Supabase seed admin insert error:', insertError.message);
    return;
  }
  didSeedAdmin = true;
  console.log(`Seeded admin user: ${username}`);
}

async function ensureDbConnected() {
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;
  } catch (err) {
    throw new Error(`Supabase unavailable: ${err.message || String(err)}`);
  }
}

app.use(async (req, res, next) => {
  try {
    await ensureDbConnected();
    await ensureAdminSeeded();
    return next();
  } catch (err) {
    console.error('DB ensure failed:', err && err.message);
    return res.status(503).json({
      error: 'Database unavailable',
      message: err && err.message ? err.message : 'Unable to connect to database'
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blob', blobRoutes);

app.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabase: { reachable: true },
    environment: process.env.APP_ENV || 'production'
  };
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;
    return res.json(health);
  } catch (err) {
    health.status = 'degraded';
    health.supabase = { reachable: false, error: err.message || String(err) };
    return res.status(503).json(health);
  }
});

const specPath = path.resolve(__dirname, '..', 'docs', 'openapi.yaml');
if (fs.existsSync(specPath)) {
  app.get('/openapi.yaml', (req, res) => res.sendFile(specPath));
  console.log('Serving docs/openapi.yaml at /openapi.yaml');
} else {
  app.get('/openapi.yaml', (req, res) => res.status(404).json({ error: 'openapi.yaml not found' }));
  console.warn('docs/openapi.yaml not found');
}

const PORT = process.env.PORT || 3000;
const ENABLE_DOCS = process.env.ENABLE_DOCS === 'true';

async function start() {
  try {
    if (ENABLE_DOCS) {
      try {
        const mod = await import('@scalar/express-api-reference');
        const apiReference = mod.apiReference ?? mod.default ?? mod;
        app.use(
          '/api/docs',
          apiReference({
            theme: 'purple',
            url: '/openapi.yaml'
          })
        );
        console.log('Scalar API Reference mounted at /api/docs');
      } catch (err) {
        console.error("Couldn't mount Scalar UI:", err);
      }
    } else {
      console.log('API documentation disabled (ENABLE_DOCS=false)');
    }

    app.use((err, req, res, next) => {
      console.error('Error:', err);

      if (err && (err.code === 'ETIMEDOUT' || (err.message && err.message.includes('timeout')))) {
        return res.status(504).json({
          error: 'Request timeout',
          message: 'The operation took too long to complete'
        });
      }

      if (err && err.message && err.message.includes('CORS')) {
        return res.status(403).json({
          error: 'CORS error',
          message: 'Origin not allowed'
        });
      }

      res.status(err && err.status ? err.status : 500).json({
        error: err && err.message ? err.message : 'Internal Server Error'
      });
    });

    app.use((req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
      });
    });

    await ensureAdminSeeded();
    app.listen(PORT, () => {
      console.log(`Express server listening on http://localhost:${PORT}/api`);
      console.log(`OpenAPI spec: http://localhost:${PORT}/openapi.yaml`);
      console.log(`Docs UI: http://localhost:${PORT}/api/docs`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}
start();

module.exports = serverless(app, {
  binary: ['image/*', 'video/*', 'application/pdf']
});
