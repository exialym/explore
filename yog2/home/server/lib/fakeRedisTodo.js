/**
 * Created by exialym on 2017/6/23.
 */
export default class FakeRedisTodo {
  constructor() {
    this.db = {};
  }

  async GET(key) {
    await timeout(Math.random());
    return this.db[key];
  }

  async SET(key, value) {
    await timeout(Math.random());
    this.db[key] = value;
    return 0;
  }
}

const timeout = (time) => {
  return new Promise(fullfill => {
    setTimeout(fullfill, time)
  });
};