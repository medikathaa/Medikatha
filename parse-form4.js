import fs from 'fs';
const html = fs.readFileSync('form.html', 'utf8');

// Find FB_PUBLIC_LOAD_DATA_
const startStr = 'var FB_PUBLIC_LOAD_DATA_ = ';
const endStr = ';</script>';
const start = html.indexOf(startStr);
if (start > -1) {
  const jsonStr = html.substring(start + startStr.length, html.indexOf(endStr, start));
  try {
    const data = JSON.parse(jsonStr);
    const fields = data[1][1];
    fields.forEach(f => {
      const title = f[1];
      const entryId = f[4] && f[4][0] && f[4][0][0] ? f[4][0][0] : 'N/A';
      console.log(title, '-> entry.' + entryId);
      if (f[4] && f[4][0] && f[4][0][1]) {
        console.log('  Options:', f[4][0][1].map(o => o[0]).join(' | '));
      }
    });
  } catch (e) {
    console.error('Failed to parse:', e.message);
  }
} else {
  console.log('FB_PUBLIC_LOAD_DATA_ not found');
}
