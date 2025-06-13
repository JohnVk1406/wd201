const readline = require("readline");

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(`Please provide your name - `, (name) => {
  console.log(`Hi ${name}!`);
  lineDetail.close();
});

const args = process.argv;
const num1 = parseInt(args[2]);
const num2 = parseInt(args[3]);
console.log(`The sum is: ${num1 + num2}`);

console.log(args);