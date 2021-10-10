require('dotenv').config();
const cryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

module.exports = {
  encryptPwd: (unhashedPwd) => {
    const salt = bcrypt.genSaltSync(10);
    const encrypted = bcrypt.hashSync(unhashedPwd, salt);
    return encrypted;
  },

  decryptPwd: (hashedPwd) => {
    let byte = cryptoJS.AES.decrypt(hashedPwd, process.env.CRYPTOJS_SECRET);
    const decrypted = byte.toString(cryptoJS.enc.Utf8);
    return decrypted;
  },

  comparePwd: (decryptedPwd, encryptedPwd) => {
    const compare = bcrypt.compareSync(decryptedPwd, encryptedPwd);
    return compare; // boolean
  },
};
