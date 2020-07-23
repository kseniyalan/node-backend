module.exports = (str) => {
  return typeof str === 'string' && str.length > 0 && !/^\s*$/.test(str.trim());
};
