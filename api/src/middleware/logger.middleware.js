import morgan from 'morgan';
const requestLogger = morgan('[:date[iso]] :method :url :status :res[content-length] ');
export default requestLogger;
