const { google } = require("googleapis");

const drive = google.drive({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY
});

exports.listImages = async (folderId) => {
  let allFiles = [];
  let pageToken = null;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: "nextPageToken, files(id, name, mimeType)",
      pageSize: 1000,
      pageToken
    });

    allFiles = allFiles.concat(res.data.files || []);
    pageToken = res.data.nextPageToken;

  } while (pageToken);

  return allFiles;
};
// https://drive.google.com/file/d/${fileId}/view