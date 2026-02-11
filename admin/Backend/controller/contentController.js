const { v4: uuidv4 } = require('uuid');
const { UTApi, UTFile } = require('uploadthing/server');
const { supabase } = require('../lib/supabase');
const utapi = new UTApi();

async function list(req, res, next) {
  try {
    let query = supabase.from('contents').select('*').order('created_at', { ascending: false }).limit(100);
    if (req.query.category) query = query.eq('category', req.query.category);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    res.json(data || []);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { data: arr, error } = await supabase.from('contents').select('*').eq('id', req.params.id).limit(1);
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const data = arr && arr[0];
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function createWithUpload(req, res, next) {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'missing required fields' });
    }
    if (!['foto', 'video'].includes(category)) {
      return res.status(400).json({ error: 'invalid category' });
    }

    // Handle file dari upload.fields
    const mainFile = req.files && req.files['file'] && req.files['file'][0];
    const thumbnailFile = req.files && req.files['thumbnail'] && req.files['thumbnail'][0];

    if (!mainFile) {
      return res.status(400).json({ error: 'file is required' });
    }

    // Upload main file
    const safeName = mainFile.originalname.replace(/\s+/g, '_');
    const file = new UTFile([mainFile.buffer], safeName, { type: mainFile.mimetype });
    const uploaded = await utapi.uploadFiles([file]);
    const item = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const info = item && item.data;
    if (!info || (!info.ufsUrl && !info.url && !info.key)) return res.status(500).json({ error: 'upload failed' });
    const appId = process.env.UPLOADTHING_APP_ID;
    const url = info.ufsUrl || info.url || (appId && info.key ? `https://${appId}.ufs.sh/f/${info.key}` : null);
    if (!url) return res.status(500).json({ error: 'upload failed' });

    // Upload thumbnail jika ada (untuk video)
    let thumbnailUrl = null;
    let thumbnailName = null;
    if (thumbnailFile && category === 'video') {
      const thumbSafeName = thumbnailFile.originalname.replace(/\s+/g, '_');
      const thumbFile = new UTFile([thumbnailFile.buffer], thumbSafeName, { type: thumbnailFile.mimetype });
      const thumbUploaded = await utapi.uploadFiles([thumbFile]);
      const thumbItem = Array.isArray(thumbUploaded) ? thumbUploaded[0] : thumbUploaded;
      const thumbInfo = thumbItem && thumbItem.data;
      if (thumbInfo && (thumbInfo.ufsUrl || thumbInfo.url || thumbInfo.key)) {
        thumbnailUrl = thumbInfo.ufsUrl || thumbInfo.url || (appId && thumbInfo.key ? `https://${appId}.ufs.sh/f/${thumbInfo.key}` : null);
        thumbnailName = thumbSafeName;
      }
    }

    const row = {
      id: uuidv4(),
      title,
      description,
      category,
      file_name: safeName,
      file_path: url,
      thumbnail_name: thumbnailName,
      thumbnail_path: thumbnailUrl,
      created_by: req.user.id,
      created_at: new Date().toISOString(),
    };

    const { data: insertedArr, error } = await supabase.from('contents').insert(row).select('*');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const inserted = insertedArr && insertedArr[0];
    res.status(201).json({
      message: 'Content uploaded successfully',
      content: inserted,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { data: existingArr, error: getErr } = await supabase
      .from('contents')
      .select('*')
      .eq('id', req.params.id)
      .limit(1);
    if (getErr) return res.status(500).json({ error: 'database error', message: getErr.message });
    const existing = existingArr && existingArr[0];
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const updates = {};
    const { title, description, category } = req.body;
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (category && ['foto', 'video'].includes(category)) updates.category = category;

    // Handle file dari upload.fields
    const mainFile = req.files && req.files['file'] && req.files['file'][0];
    const thumbnailFile = req.files && req.files['thumbnail'] && req.files['thumbnail'][0];
    const appId = process.env.UPLOADTHING_APP_ID;

    if (mainFile) {
      const safeName = mainFile.originalname.replace(/\s+/g, '_');
      const file = new UTFile([mainFile.buffer], safeName, { type: mainFile.mimetype });
      const uploaded = await utapi.uploadFiles([file]);
      const item = Array.isArray(uploaded) ? uploaded[0] : uploaded;
      const info = item && item.data;
      if (!info || (!info.ufsUrl && !info.url && !info.key)) return res.status(500).json({ error: 'upload failed' });
      const url = info.ufsUrl || info.url || (appId && info.key ? `https://${appId}.ufs.sh/f/${info.key}` : null);
      if (!url) return res.status(500).json({ error: 'upload failed' });
      updates.file_name = safeName;
      updates.file_path = url;
    }

    // Upload thumbnail jika ada
    if (thumbnailFile) {
      const thumbSafeName = thumbnailFile.originalname.replace(/\s+/g, '_');
      const thumbFile = new UTFile([thumbnailFile.buffer], thumbSafeName, { type: thumbnailFile.mimetype });
      const thumbUploaded = await utapi.uploadFiles([thumbFile]);
      const thumbItem = Array.isArray(thumbUploaded) ? thumbUploaded[0] : thumbUploaded;
      const thumbInfo = thumbItem && thumbItem.data;
      if (thumbInfo && (thumbInfo.ufsUrl || thumbInfo.url || thumbInfo.key)) {
        const thumbnailUrl = thumbInfo.ufsUrl || thumbInfo.url || (appId && thumbInfo.key ? `https://${appId}.ufs.sh/f/${thumbInfo.key}` : null);
        updates.thumbnail_name = thumbSafeName;
        updates.thumbnail_path = thumbnailUrl;
      }
    }

    const { data: updatedArr, error } = await supabase.from('contents').update(updates).eq('id', req.params.id).select('*');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const updated = updatedArr && updatedArr[0];
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { data: deletedArr, error } = await supabase.from('contents').delete().eq('id', req.params.id).select('id');
    if (error) return res.status(500).json({ error: 'database error', message: error.message });
    const deleted = deletedArr && deletedArr[0];
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, createWithUpload, update, remove };
