const { google } = require('googleapis');
const fetch = require('node-fetch');
const { getChart } = require('./helper');

require('dotenv').config();

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.API_KEY,
});

const parseData = rows => {
  const valid = new Map();
  const invalid = new Map();
  // 4 9 15
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const dateTime = new Date(row[4]);
    const isInstall = row[9] === 'install';
    const isValid = row[15] === 'FALSE';

    if (isInstall) {
      const day = dateTime.getUTCDate();
      const hour = dateTime.getUTCHours();
      const label = `${day < 10 ? `0${day}` : day} March, ${hour < 10 ? `0${hour}` : hour} hr`;

      if (isValid) {
        const value = valid.get(label) || 0;
        valid.set(label, value+1);
      } else {
        const value = invalid.get(label) || 0;
        invalid.set(label, value+1);
      }
    }
  }

  return [valid, invalid];
}

const main = async () => {
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: '1GdAvC7NkbBLbPOCXy-7lPsM8SSmt8NtQwibOVIkQkOo',
    range: 'Data1',
  });
  const rows = data.values;
  // console.log(rows[1], rows.length);

  const parsed = parseData(rows);
  // console.log(parsed[0], parsed[1]);
  const validMap = new Map([...parsed[0].entries()].sort());
  const invalidMap = new Map([...parsed[1].entries()].sort());

  const validKeyArray = Array.from(validMap.keys());
  const validValueArray = Array.from(validMap.values());

  const invalidKeyArray = Array.from(invalidMap.keys());
  const invalidValueArray = Array.from(invalidMap.values());
  // console.log(validKeyArray, validValueArray, parsed[0]);

  const html = getChart([JSON.stringify(validKeyArray), JSON.stringify(validValueArray), JSON.stringify(invalidKeyArray), JSON.stringify(invalidValueArray)]);

  // console.log(html);

  const res = await fetch('https://w08plybp32.execute-api.us-west-2.amazonaws.com/prod/upload', {
    method: 'POST',
    body: JSON.stringify({
      key: 'mukul',
      content: encodeURIComponent(html),
    }),
  });

  console.log('http://assignment.tyroo.com/mukul');
}

main();
