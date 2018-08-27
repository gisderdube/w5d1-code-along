const bcrypt = require('bcrypt')

const pw = 'test1234'

const encrypted = bcrypt.hashSync(pw, 10)

const wrong = 'qeorihqweohiqwe'
const correct = pw

const wrongResult = bcrypt.compareSync(wrong, encrypted)
console.log('wrongResult', wrongResult)

const correctPassword = bcrypt.compareSync(correct, encrypted)
console.log('correctPassword', correctPassword)
