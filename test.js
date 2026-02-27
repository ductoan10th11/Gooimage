require('dotenv').config()
const { google } = require("googleapis");

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY
});

async function listImages(folderId) {
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: "files(id, name, mimeType)"
    });

    console.log(res.data.files);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

listImages("1tgPcxV6WdNhMUYWiIaO0YEeTuNtelmCu");