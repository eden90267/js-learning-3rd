const o = {
  name: 'Julie',
  greetBackWards: function() {
    const getReverseName = () => {
      let nameBackwards = '';
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackwards += this.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} si eman ym, olleH`;
  },
};
o.greetBackWards();