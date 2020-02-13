import * as winston from 'winston';
const { combine, timestamp, label, prettyPrint, colorize } = winston.format;
import 'winston-mongodb';

const {DB_HOST, DB_PORT, DB_ROOT} = process.env;

const transports: any = winston.transports;
export const logger = winston.createLogger({
  defaultMeta: { service: 'user-service' },
  transports: [
		!process.env.DEV ? new transports.MongoDB({
			level: 'error',
			db: `mongodb://${DB_HOST}:${DB_PORT}/${DB_ROOT}`,
			options: {useNewUrlParser: true, useUnifiedTopology: true},
			includeIds: true
		}) : new winston.transports.Console({
				level: 'error',
				format: combine(
					colorize(),
					timestamp(),
					prettyPrint()
				)
			})
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
