const winston = require('winston');
const { format, createLogger, transports } = winston;

const formatMeta = (meta) => {
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
  }
  return '';
};

const customFormat = winston.format.printf(({
  timestamp,
  level,
  message,
  label = '',
  ...meta
}) => `[${timestamp}] ${level} ${label} ${message} ${formatMeta(meta)}`);

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    customFormat,
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
