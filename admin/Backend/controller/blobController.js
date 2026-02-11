const { UTApi, UTFile } = require('uploadthing/server');
const utapi = new UTApi();

async function uploadFile(req, res, next) {
    try {
        if (!req.file) return res.status(400).json({ error: 'file is required' });
        const originalName = req.file.originalname.replace(/\s+/g, '_');
        const file = new UTFile([req.file.buffer], originalName, { type: req.file.mimetype });
        const uploaded = await utapi.uploadFiles([file]);
        const item = Array.isArray(uploaded) ? uploaded[0] : uploaded;
        const info = item && item.data;
        if (!info || (!info.ufsUrl && !info.url && !info.key)) return res.status(500).json({ error: 'upload failed' });
        const appId = process.env.UPLOADTHING_APP_ID;
        const url = info.ufsUrl || info.url || (appId && info.key ? `https://${appId}.ufs.sh/f/${info.key}` : null);
        if (!url) return res.status(500).json({ error: 'upload failed' });
        res.status(201).json({ ok: true, path: info.key, url });
    } catch (err) { next(err); }
}

module.exports = { uploadFile };
