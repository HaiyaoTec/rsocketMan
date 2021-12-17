const { Flowable } = require('rsocket-flowable');
const utils = require('./util');

class RandomNumberService {
  getRandomNumberFlowable() {
    return new Flowable((subscriber) => {
      let interval;
      let sent = 0;
      subscriber.onSubscribe({
        request: (n) => {
          interval = setInterval(() => {
            const number = utils.getRandomNumber();
            subscriber.onNext(number);
            sent++;
            if (sent >= n) {
              clearInterval(interval);
            }
          }, 1000);
        },
        cancel: () => {
          clearInterval(interval);
        }
      });
    });
  }
}

module.exports = RandomNumberService;
