/*!
 * Routers
 * Copyright(c) 2020-2020 Edgard Junior
 * MIT Licensed
 */

"use strict"
const UserController    = require('../App/Controller/UserController');
const encryptPass       = require('../middleware/auth')
const paramsRequired    = require('../middleware/required')
const auth              = require('../App/Auth/auth')
const cors              = require('../middleware/cors')

module.exports = (app) => {

    /**
    * Middleware cors resolvendo Cross-origin resource sharing
    */
    app.use(cors)

    /**
     * Middleware ecryptar request passwors.
     * Os middlewares são funções que podem tratar os inputs e outputs das rotas antes e ou 
     * depois que uma rota é processada, ou seja, você pode criar um middleware que intercepta 
     * e verificar se uma requisição esta enviando um header específico e que caso o mesmo não
     * esteja enviando o header ela retorne uma tela de erro para o usuário, negando a
     * requisição de acessar uma determinada rota da aplicação, neste caso você criou e 
     * inejtou um middleware que trata uma pré-requisição.
     */
    app.use('/create/user', paramsRequired.create_user, encryptPass);

    app.get('/', function (req, res) {
        res.status(200).json({status:200, message});
    });

    /**
     * Auth method
     * @param {email,password} req 
     * @param {token,status} res 
     */
    app.post('/auth', paramsRequired.auth, (req, res) => {
        let { email, password } = req.body
        auth({ email, password })
            .then((data) => {
                res.status(data.status).json(data);
            })
    })

    /**
     * Routers HTTP Users
     * @create
     * @find
     * @findAll
     */
    app.get('/find-all/users', UserController.findAllUsers);
    app.get('/find/:user_id/user/', UserController.findUser);
    app.post('/create/user', UserController.createUser);
    app.put('/update/:user_id/user/', UserController.updateUser);
    app.delete('/delete/:user_id/user/', UserController.deleteUser);

    /**
     *
     * Existe um método de roteamento especial, app.all(), que não é derivado de nenhum método HTTP.
     * Este método é usado para carregar funções de middleware em um caminho para todos os métodos de solicitação.
     * No exemplo a seguir, o manipulador irá ser executado para solicitações para “/secret” se você estiver usando
     * GET, POST, PUT, DELETE, ou qualquer outro método de solicitação HTTP que é suportado no módulo http.
     *
     */
    app.all('/secret-hash', function (req, res, next) {
        console.log('Accessing the secret section ...');
        res.send('secret');
        next(); // pass control to the next handler
    });
}
