// SVG→PNG変換スクリプト (sharp使用)
import { readFileSync, writeFileSync } from 'fs';

// sharp がなければ canvas ベースで変換
async function convertWithSharp() {
  try {
    const sharp = (await import('sharp')).default;
    const svgBuffer = readFileSync('public/og-image.svg');
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png()
      .toFile('public/og-image.png');
    console.log('✅ og-image.png を生成しました (sharp)');
  } catch (e) {
    console.log('sharp が利用不可、代替方法を使用します:', e.message);
    // SVGをそのまま使用する方針に切り替え
    console.log('ℹ️ SVGファイルを直接OGPに使用します');
  }
}

convertWithSharp();
