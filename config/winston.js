require('winston-daily-rotate-file');
var appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
//adicionando transporte (ou onde o log vai ser guardado) para o console
var consoleTransport = {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
};

// configurações do winston sobre a parte de transporte (ou onde o log vai ser guardado)
//guarda config de logs de erros
var transportErr = new (transports.DailyRotateFile)({
    filename: `${appRoot}/logs/korok-error-%DATE%.log`,
    datePattern: 'YYYY-MM',
    maxSize: '20m',
    json: false,
    level: 'error'
});

// instancia um logger com as confg abaixo
var logger = createLogger({
    format: format.combine(
        format.simple()
    ),
    transports: [transportErr,  new transports.Console(consoleTransport)],
    exitOnError: false, // pra que app não seja finalizado após uma execução
});

// cria um obj stream que possibilita o morgan (uma lib que faz log de requisições http) utilizar as funcionalidades do winston
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;