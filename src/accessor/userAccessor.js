const Roles = require('../constants/roles')

function fetchUserInfo(email) {
    if (email === 'a@gmail.com') {
        return Promise.resolve({
            name: 'A',
            email: email,
            password: 'abc',
            role: Roles.Admin
        })
    } 
else if (email === 'b@gmail.com') {
    return Promise.resolve({
        name: 'B',
        email: email,
        password: 'abcd',
        role: Roles.Student

})
}
else {
    return Promise.reject('Invalid address')
}
}

module.exports = {
    fetchUserInfo
}