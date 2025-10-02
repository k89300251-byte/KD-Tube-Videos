const fs = require('fs');
const path = require('path');

const videosJsonPath = path.join(__dirname, '../videos.json');
const videosDir = path.join(__dirname, '../videos');

// Example: get the newest file added in /videos
const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
files.sort((a,b) => fs.statSync(path.join(videosDir, b)).mtimeMs - fs.statSync(path.join(videosDir, a)).mtimeMs);

if(files.length === 0) {
  console.log("No videos found.");
  process.exit(0);
}

const newVideoFile = files[0]; // assume last uploaded video
const videoTitle = path.parse(newVideoFile).name;

// Load existing JSON
let data = {};
if(fs.existsSync(videosJsonPath)) {
  data = JSON.parse(fs.readFileSync(videosJsonPath));
} else {
  data = { home: [], trending: [], gaming: [], music: [] };
}

// Create new video entry
const newEntry = {
  title: videoTitle,
  desc: "Uploaded via PR",
  src: `https:/github/k89300251-byte/KD-Tube-Videos@main/Videos/${newVideoFile}`,
};

// Append to home section
data.home.push(newEntry);

// Write back to videos.json
fs.writeFileSync(videosJsonPath, JSON.stringify(data, null, 2));
console.log(`Added ${newVideoFile} to videos.json`);
