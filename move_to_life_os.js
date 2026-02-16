const https = require('https');

const targetPageId = "306fec35-203f-8039-8c3c-f650863ab522"; // Life OS
const databaseIds = [
  "306fec35-203f-817f-9bad-e6c6e6132583", // DSA
  "306fec35-203f-813e-97b5-c952d70a7c43", // LLD
  "306fec35-203f-81a6-bca9-f039897cdb42", // Cohort
  "306fec35-203f-81f0-9f67-facbbca2d22b"  // HLD
];

const authHeader = 'Bearer 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';

function moveDatabase(dbId) {
  // Databases are pages in Notion, so we update the page parent to move it
  const data = JSON.stringify({
    parent: { type: "page_id", page_id: targetPageId }
  });

  const options = {
    hostname: 'api.notion.com',
    path: `/v1/pages/${dbId}`,
    method: 'PATCH',
    headers: {
      'Authorization': authHeader,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, res => {
    console.log(`Moving ${dbId}: ${res.statusCode}`);
  });
  
  req.on('error', e => console.error(e));
  req.write(data);
  req.end();
}

databaseIds.forEach((id, i) => {
  setTimeout(() => moveDatabase(id), i * 500);
});

// Also archive the old "Life" page
setTimeout(() => {
  const archiveData = JSON.stringify({ archived: true });
  const options = {
    hostname: 'api.notion.com',
    path: '/v1/pages/306fec35-203f-816c-84a0-cf574920c48f',
    method: 'PATCH',
    headers: {
      'Authorization': authHeader,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  };
  const req = https.request(options);
  req.write(archiveData);
  req.end();
  console.log("Archived old Life page.");
}, 3000);
