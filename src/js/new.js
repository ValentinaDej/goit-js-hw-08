let room = {
  number: 23,
  toJSON() {
    return this.number;
  },
};
console.log(JSON.stringify(room));
