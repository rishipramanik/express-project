const jwt = require('jsonwebtoken')
const UserAccessor = require('../accessor/userAccessor')

const secretKey = 'sagyafdjskdvgkuy';

function login(email, password) {
    return UserAccessor.fetchUserInfo(email)
    .then(user => {
        if(user.password === password){
            const token = jwt.sign({email, name: user.name}, secretKey);
            return { status: true, token: token}
        }
        else {
            return { status: false, error: 'Password mismatch'}
        }
    })
}



module.exports = {
    login
}