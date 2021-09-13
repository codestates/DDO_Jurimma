module.exports = {
  IsValidatePassword: (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  },

  IsValidateEmail: (email) => {
    return /^[A-Za-z0-9\.\-_]+@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(email);
  },

  OnlyKorEng: (str) => {
    return /^[가-힣a-zA-Z]+$/.test(str);
  },

  OnlyNumber: (str) => {
    return /^[0-9]+$/.test(str);
  },

  WordNameLength: (str) => {
    return /^.{1,20}$/.test(str);
  },

  WordMeanLength: (str) => {
    return /^.{1,200}$/.test(str);
  },
};
