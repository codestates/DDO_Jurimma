require('dotenv').config();
const AES = require('aes256');

module.exports = {
  encryptPwd: (unhashedPwd) => {
    const encrypted = AES.encrypt(process.env.NODE_SALT, unhashedPwd);
    return encrypted;
  },

  decryptPwd: (hashedPwd) => {
    const decrypted = AES.decrypt(process.env.NODE_SALT, hashedPwd);
    return decrypted;
  },
};
