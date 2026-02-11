const { v4: uuidv4 } = require('uuid');
const { UTApi, UTFile } = require('uploadthing/server');
const { supabase } = require('../lib/supabase');
const utapi = new UTApi();

async function createWithUpload(req, res, next) {
  try {
    const { name, profession, content, rating } = req.body;
    if (!name || !profession || !content || !rating)
      return res.status(400).json({ error: 'missing required fields' });

    let photo_path = null;
    if (req.file) {
      const safeName = req.file.originalname.replace(/\s+/g, '_');
      const file = new UTFile([req.file.buffer], safeName, { type: req.file.mimetype });
      const uploaded = await utapi.uploadFiles([file]);
      const item = Array.isArray(uploaded) ? uploaded[0] : uploaded;
      const info = item && item.data;
      if (!info || (!info.ufsUrl && !info.url && !info.key)) return res.status(500).json({ error: 'upload failed' });
      const appId = process.env.UPLOADTHING_APP_ID;
      const url = info.ufsUrl || info.url || (appId && info.key ? `https://${appId}.ufs.sh/f/${info.key}` : null);
      if (!url) return res.status(500).json({ error: 'upload failed' });
      photo_path = url;
    }

    const row = {
      id: uuidv4(),
      name,
      profession,
      content,
      rating: parseInt(rating, 10),
      photo_path,
      created_by: req.user.id,
      created_at: new Date().toISOString(),
    };

    const { data: insertedArr, error } = await supabase.from('testimonials').insert(row).select('*');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const inserted = insertedArr && insertedArr[0];
    res.status(201).json({
      message: 'Testimonial created successfully',
      testimonial: inserted
    });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    res.json(data || []);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { data: arr, error } = await supabase.from('testimonials').select('*').eq('id', req.params.id).limit(1);
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const data = arr && arr[0];
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { data: existingArr, error: getErr } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', req.params.id)
      .limit(1);
    if (getErr) return res.status(500).json({ error: 'database error', message: getErr.message });
    const existing = existingArr && existingArr[0];
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const updates = {};
    const { name, profession, content, rating } = req.body;
    if (name) updates.name = name;
    if (profession) updates.profession = profession;
    if (content) updates.content = content;
    if (rating) updates.rating = parseInt(rating, 10);

    if (req.file) {
      const safeName = req.file.originalname.replace(/\s+/g, '_');
      const file = new UTFile([req.file.buffer], safeName, { type: req.file.mimetype });
      const uploaded = await utapi.uploadFiles([file]);
      const item = Array.isArray(uploaded) ? uploaded[0] : uploaded;
      const info = item && item.data;
      if (!info || (!info.ufsUrl && !info.url && !info.key)) return res.status(500).json({ error: 'upload failed' });
      const appId = process.env.UPLOADTHING_APP_ID;
      const url = info.ufsUrl || info.url || (appId && info.key ? `https://${appId}.ufs.sh/f/${info.key}` : null);
      if (!url) return res.status(500).json({ error: 'upload failed' });
      updates.photo_path = url;
    }

    const { data: updatedArr, error } = await supabase.from('testimonials').update(updates).eq('id', req.params.id).select('*');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const updated = updatedArr && updatedArr[0];
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { data: deletedArr, error } = await supabase.from('testimonials').delete().eq('id', req.params.id).select('id');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const deleted = deletedArr && deletedArr[0];
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createWithUpload, list, getById, update, remove };
