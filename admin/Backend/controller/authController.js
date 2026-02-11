const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../lib/supabase');
const { generateToken } = require('../lib/auth');

async function register(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'username & password required' });

        const { data: existingArr, error: checkErr } = await supabase
            .from('users')
            .select('id')
            .eq('username', username)
            .limit(1);
        if (checkErr) return res.status(500).json({ error: 'database error', message: checkErr.message });
        const existing = existingArr && existingArr[0];
        if (existing) return res.status(409).json({ error: 'username already taken' });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = { id: uuidv4(), username, password: hashed, role: 'user', created_at: new Date().toISOString() };
        const { data: insertedArr, error: insertErr } = await supabase.from('users').insert(newUser).select('id, username, created_at');
        if (insertErr) return res.status(500).json({ error: 'database error', message: insertErr.message });
        const inserted = insertedArr && insertedArr[0];
        res.status(201).json(inserted);
    } catch (err) { next(err); }
}

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'username & password required' });

        const { data: userArr, error: fetchErr } = await supabase
            .from('users')
            .select('id, username, password')
            .eq('username', username)
            .limit(1);
        if (fetchErr) return res.status(500).json({ error: 'database error', message: fetchErr.message });
        const user = userArr && userArr[0];
        if (!user) return res.status(401).json({ error: 'invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: 'invalid credentials' });

        const token = generateToken({ id: user.id, username: user.username });
        res.json({ token });
    } catch (err) { next(err); }
}

module.exports = { register, login };
