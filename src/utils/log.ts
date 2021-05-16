import * as winston from 'winston';
import 'winston-mongodb';

const { combine, timestamp, prettyPrint, colorize } = winston.format;
const { DB_HOST, DB_PORT, DB_ROOT, mode } = process.env;
const isProd = mode === 'PRODUCTION';

const { transports } = winston;
/* prettier-ignore */
const logger = winston.createLogger({
	defaultMeta: { service: 'user-service' },
	transports: [
		isProd
			? new transports.MongoDB({
				level: 'error',
				db: `mongodb://${DB_HOST}:${DB_PORT}/${DB_ROOT}`,
				options: { useNewUrlParser: true, useUnifiedTopology: true },
				includeIds: true
			  })
			: new winston.transports.File({
				level: 'error',
				filename: 'error.log',
				format: combine(colorize(), timestamp(), prettyPrint())
			  })
	]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

export default logger;
