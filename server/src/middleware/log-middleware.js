import { requestLogger, logger } from '../helpers/log-helper.js';

const logMiddleware = (req, res, next) => {
    try {
        const { headers, body, query } = req;
        requestLogger.info(`Request: ${JSON.stringify({ headers, body, query })}`);
        next();
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export default logMiddleware;