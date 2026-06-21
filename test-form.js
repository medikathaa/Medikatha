const url = 'https://docs.google.com/forms/d/e/1FAIpQLSfFn8gvFeE31iIaWGGpOb2Z75a5SWP7hqdn2K-4GI2KTq-0wA/formResponse';
const data = new URLSearchParams({
  'entry.1927071851': 'Test Name',
  'entry.1452211488': 'test@example.com',
  'entry.483622578': '1234567890',
  'entry.1656408751': 'Test Org',
  'entry.1368578028': 'Test Role',
  'entry.334532387': 'Test Service',
  'entry.211672032': 'Test Challenge'
});

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: data.toString()
}).then(res => {
  console.log('Status:', res.status);
  return res.text();
}).then(text => {
  console.log('Response body:', text.substring(0, 500));
}).catch(console.error);
