module.exports = (num, p1, p2) => {
  return (
    Number.isInteger(num) &&
    num > 0 &&
    (p1 ? num >= p1 : true) &&
    (p2 ? num <= p2 : true)
  );
};