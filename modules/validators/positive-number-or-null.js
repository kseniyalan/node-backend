module.exports = (num) => {
  return (
    (Number.isInteger(num) && num > 0) || (num === null)
  );
};