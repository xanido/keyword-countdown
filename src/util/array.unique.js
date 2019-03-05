/* eslint-disable no-extend-native */
Array.prototype.unique = function unique() {
  return this.filter((value, index, self) => self.indexOf(value) === index);
};
/* eslint-enable */
