const fs = require('fs');
const path = require('path');

console.log('Please type in your text');

const output = fs.createWriteStream(path.join(__dirname, 'result.txt'));
process.stdin.on('data', data => {
  if(data.toString().trim() === 'exit') process.exit();
  output.write(data.toString());
});
process.on('SIGINT', () => process.exit());

process.on('exit', () => console.log('Good luck!'));