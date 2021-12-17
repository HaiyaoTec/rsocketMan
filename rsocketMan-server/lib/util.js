const closeWithGrace = require('close-with-grace');
const logger = require('./logger');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const closingOperations = [];
let finalCloseOperation;

/**
 * Allow for graceful cleanup when/if the process is going to close.
 */
closeWithGrace(async function ({ signal, err, manual }) {
  if (err) {
    logger.error('Process closing with error:', err);
    console.error(err.stack);
  }
  for (cb of closingOperations) {
    await cb({ err, signal, manual });
  }
  if (finalCloseOperation) {
    await finalCloseOperation({ err, signal, manual });
  }
});

const serializeData = (data) => JSON.stringify(data);

module.exports = {
  getRandomLetter: () => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  },
  getRandomNumber(max = 1000) {
    return Math.floor(Math.random() * max);
  },
  buildMessage: (data) => {
    return {
      data: serializeData(data)
    };
  },
  serializeData,
  deSerializeMsg: ({ data, metadata }) => {
    return {
      data: data != null ? JSON.parse(data) : null,
      metadata: metadata != null ? JSON.parse(metadata) : null
    };
  },
  sleep: async (ms) => {
    return new Promise(r => setTimeout(r, ms));
  },
  /**
   * Registers the `cb` callback function as a callback to be invoked when the process
   * is closing.
   * @param {*} cb
   */
  onClose: (cb) => {
    closingOperations.push(cb);
  },
  /**
   * When the process is closing the `cb` callback method will be the last method to be called
   * before the process exits.
   * @param {*} cb
   */
  finallyOnClose: (cb) => {
    finalCloseOperation = cb;
  }
};
