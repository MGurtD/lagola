import bunyan from 'bunyan'
import bunyanRequest from 'bunyan-request'

const logger = bunyan.createLogger({name: 'lagola-backend'});
const requestLogger = bunyanRequest({
  logger: logger,
  headerName: 'x-request-id'
});

export default requestLogger
