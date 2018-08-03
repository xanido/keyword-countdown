Array.prototype.unique = function unique() {
  return this.filter((value, index, self) => self.indexOf(value) === index);
};
