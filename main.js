// NOTE: Monthly installment formula
// run 'npm install' first
// LoanAmount * (1 + (LoanTerm *(InterestRate / 100))) / LoanTerm
// use this command to run -> node main.js --loanTerm=24 --bankName='bpi' --loanAmount=10000

'use strict';

const { argv } = require('yargs');

// console.log(argv);

const bank = argv.bankName;
const amount = argv.loanAmount;
const term = argv.loanTerm;

// console.log(bank);
// console.log(amount);
// console.log(term);