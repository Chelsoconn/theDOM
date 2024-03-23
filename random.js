let newObj = {
  init() {
    this.someOtherFunc()
  },

  someOtherFunc() {
    console.log('hi')
  }

  anotherFunc() {
    console.log('here')
  }
}

newObj.init()