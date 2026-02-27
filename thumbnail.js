// thumbnail.js — ES Module version
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

// ─── CONFIG ────────────────────────────────────────────────
const INPUT_DIR = './videos';
const OUTPUT_DIR = './thumbnails';
const SEEK_TIME = 2;
const THUMB_SIZE = '640x360';
const SUPPORTED_EXTS = ['.mp4', '.mkv', '.avi', '.mov', '.webm'];
// ───────────────────────────────────────────────────────────

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const generateThumbnail = (videoPath, outputDir, seekTime) => {
  return new Promise((resolve, reject) => {
    const baseName = path.basename(videoPath, path.extname(videoPath));
    const filename = `${baseName}_thumb.jpg`;

    ffmpeg(videoPath)
      .screenshots({
        timestamps: [seekTime],
        filename,
        folder: outputDir,
        size: THUMB_SIZE,
      })
      .on('end', () => {
        console.log(`✅ Thumbnail saved: ${path.join(outputDir, filename)}`);
        resolve(path.join(outputDir, filename));
      })
      .on('error', (err) => {
        console.error(`❌ Failed for ${videoPath}: ${err.message}`);
        reject(err);
      });
  });
};

const processAll = async () => {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input folder not found: "${INPUT_DIR}"`);
    console.log(`👉 Create a "videos" folder and put your video files in it.`);
    process.exit(1);
  }

  const files = fs.readdirSync(INPUT_DIR).filter((file) =>
    SUPPORTED_EXTS.includes(path.extname(file).toLowerCase())
  );

  if (files.length === 0) {
    console.log(`⚠️  No video files found in "${INPUT_DIR}"`);
    return;
  }

  console.log(`\n🎬 Found ${files.length} video(s). Generating thumbnails...\n`);

  const results = { success: [], failed: [] };

  for (const file of files) {
    const videoPath = path.join(INPUT_DIR, file);
    try {
      const thumbPath = await generateThumbnail(videoPath, OUTPUT_DIR, SEEK_TIME);
      results.success.push(thumbPath);
    } catch (err) {
      results.failed.push(file);
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅ Success : ${results.success.length}`);
  console.log(`❌ Failed  : ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log(`Failed files: ${results.failed.join(', ')}`);
  }
  console.log(`📁 Thumbnails saved in: "${OUTPUT_DIR}"`);
  console.log(`─────────────────────────────────\n`);
};

processAll();
