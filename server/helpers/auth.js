const bcyprt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcyprt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcyprt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcyprt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
