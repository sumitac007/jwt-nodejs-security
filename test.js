const crypto = require('crypto');

function generatePassphrase(length) {
  return crypto.randomBytes(128).toString('hex');
}

// Generate a 128-bit (16 characters) passphrase
const passphrase128Bit = generatePassphrase(16);
console.log("128-bit Passphrase:", passphrase128Bit);