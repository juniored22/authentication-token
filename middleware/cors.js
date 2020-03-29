/**
 * Cross-origin resource sharing (CORS ou compartilhamento de recursos de origem cruzada) 
 * é uma especificação de uma tecnologia de navegadores que define meios para um servidor
 * permitir que seus recursos sejam acessados por uma página web de um domínio diferente.
 * Esse tipo de acesso seria de outra forma negado pela same origin policy. 
 * CORS define um meio pelo qual um navegador e um servidor web podem interagir para 
 * determinar se devem ou não utilizar/permitir requisições cross-origem. 
 * É um acordo que permite grande flexibilidade, mas é mais seguro que permitir 
 * todos as requisições desse tipo.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

var cors = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');

    next();
  }
  
  module.exports = cors