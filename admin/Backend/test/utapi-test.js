/* eslint-disable */
const { UTApi, UTFile } = require('uploadthing/server');
const fs = require('fs');
require('dotenv').config();

(async () => {
  const utapi = new UTApi();
  const file = new UTFile([fs.readFileSync('.env')], '.env', { type: 'text/plain' });
  const res = await utapi.uploadFiles([file]);
  console.log('UTAPI_UPLOAD_RES', res);
})(); 
