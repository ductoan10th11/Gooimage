const { google } = require("googleapis");

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY
});

exports.listImages = async(folderId) => {
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: "files(id, name, mimeType)"
    });

    return res.data.files || null
  } catch (err) {
    throw err
  }
}
