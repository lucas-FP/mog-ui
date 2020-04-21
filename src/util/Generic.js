module.exports = {
  uniqueKeyFilter(key) {
    return (value, index, self) => {
      return self.findIndex((el) => el[key] === value[key]) === index;
    };
  },
};
