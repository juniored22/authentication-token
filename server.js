"use strict"

module.exports = (app, express, config, debug, compression, bodyParser) => {

    /**
     * A compactação Gzip pode diminuir bastante o tamanho do corpo de 
     * resposta e assim aumentar a velocidade 
     * de um aplicativo da web. Use o middleware compression para fazer a 
     * compactação gzip no seu aplicativo
     */
    app.use(compression());

    /**
     * PORT=8080 nodemon index.js
     */
    app.set('port', process.env.PORT || config.app.port);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(app.get('port'), function () {
        debug(`Example app listening on port ${app.get('port')}!`);
    });
}

