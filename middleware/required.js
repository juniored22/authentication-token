
let check_letters = (str, unicod=false, number=false) => {
    const characters_utf8   = /([\u0300-\u036f]|[^0-9a-zA-Z])/g;
    const letters           = /[a-zA-Z]+/g;
    const numbers            = /[0-9]+/g;
    let elem;

    if(unicod){
        elem = unicod ? characters_utf8.exec(str) : letters.exec(str)
    }else if(number){
        elem = number ? numbers.exec(str) : letters.exec(str)
    }else{
        elem = letters.exec(str)
    }
    
    return elem ? true : false
}

const required = {
    create_user: (req, res, next) => {
        if (!req.body.name || !req.body.email || !req.body.password)
            return res.status(400).json({ status: 400, message: "Bad Request" })

        if (req.body.password.length < 6)
            return res.status(400).json({ status: 400, message: "Password must be longer than 6 characters" })

        if (!check_letters(req.body.password))
            return res.status(400).json({ status: 400, message: "the password must contain letters" })
        
        if (!check_letters(req.body.password, true))
            return res.status(400).json({ status: 400, message: "the password must contain special characters" })

        if (!check_letters(req.body.password, false, true))
            return res.status(400).json({ status: 400, message: "the password must contain numbers" })
        
        next()
    },

    auth: (req, res, next) => {
        if (!req.body.password || !req.body.email)
            return res.status(400).json({ status: 400, message: "Bad Request" })
        next()
    }
}

module.exports = required