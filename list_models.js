const https = require('https');
const fs = require('fs');
const path = require('path');

let apiKey = process.env.GEMINI_API_KEY;

// Manually read from .env.local if not in env
if (!apiKey) {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=([^\r\n]+)/);
    if (match) apiKey = match[1].trim();
  }
}

if (!apiKey) {
  console.error("❌ No API Key found in process.env or .env.local.");
  process.exit(1);
}

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models?key=${apiKey}`,
  method: 'GET'
};

console.log("🔍 Fetching available models...");

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (data.models) {
        console.log("✅ Available Models:");
        data.models.forEach(m => console.log(` - ${m.name}`));
      } else {
        console.log("❌ Error response:", JSON.stringify(data, null, 2));
      }
    } catch (e) {
      console.log("❌ Failed to parse response:", body);
    }
  });
});

req.on('error', e => console.error(e));
req.end();
