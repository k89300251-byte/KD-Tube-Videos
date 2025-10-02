const fs = require("fs");

const file = "videos.json";

let data = JSON.parse(fs.readFileSync(file, "utf8"));

const title = process.env.VIDEO_TITLE;
const desc = process.env.VIDEO_DESC || "No description";
const filename = process.env.VIDEO_FILE;

if (!filename) {
  console.error("No VIDEO_FILE passed!");
  process.exit(1);
}

const newEntry = {
  title,
  desc,
  src: `https://cdn.jsdelivr.net/gh/${process.env.GITHUB_REPOSITORY}/videos/${filename}`,
  thumb: `https://via.placeholder.com/640x360.png?text=${encodeURIComponent(title)}`
};

data.home.push(newEntry);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("✅ videos.json updated with", filename);
