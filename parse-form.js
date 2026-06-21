import fs from 'fs';
const html = fs.readFileSync('form.html', 'utf8');
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\n/s);
if (match) {
  const data = JSON.parse(match[1]);
  const fields = data[1][1];
  fields.forEach(f => {
    if (f[4]) {
      console.log(f[1], ' -> entry.' + f[4][0][0]);
    }
  });
} else {
  console.log('No FB_PUBLIC_LOAD_DATA_');
}
