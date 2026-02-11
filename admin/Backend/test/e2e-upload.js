/* eslint-disable */
const fs = require('fs');

(async () => {
  const base = 'http://localhost:3000/api';

  const loginRes = await fetch(base + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  const loginData = await loginRes.json();
  console.log('LOGIN', loginRes.status, loginData);
  if (!loginRes.ok) process.exit(1);
  const token = loginData.token;

  const blobFd = new FormData();
  blobFd.append('file', new Blob([fs.readFileSync('.env')], { type: 'text/plain' }), '.env');
  const blobRes = await fetch(base + '/blob/upload', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: blobFd,
  });
  const blobData = await blobRes.json();
  console.log('BLOB', blobRes.status, blobData);

  const cFd = new FormData();
  cFd.append('title', 'Test Title');
  cFd.append('description', 'Test Desc');
  cFd.append('category', 'foto');
  cFd.append('file', new Blob([fs.readFileSync('.env')], { type: 'text/plain' }), '.env');
  const cRes = await fetch(base + '/content', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: cFd,
  });
  const cData = await cRes.json();
  console.log('CONTENT_CREATE', cRes.status, cData);

  const listRes = await fetch(base + '/content');
  const listData = await listRes.json();
  console.log('CONTENT_LIST', listRes.status, listData);
})(); 
