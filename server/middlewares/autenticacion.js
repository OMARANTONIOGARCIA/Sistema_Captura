const jwt = require('jsonwebtoken');

//========================
//Verificacion del token
//========================

let VerificacionToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, (err, decoded) => {

        if (err) { return res.status(401).json({ ok: false, err: { messaje: 'Token no valido' } }) }
        req.usuario = decoded.usuario;
        next();

    });


};

//========================
//Verificacion del role
//========================

let VerificacionAdmin_role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role == 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: { messaje: 'El usuario no es administador' }
        });
    }

};


module.exports = { VerificacionToken, VerificacionAdmin_role };