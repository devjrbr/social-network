const bcrypt = require('bcrypt');

class CryptoService {
    hash (input) {
        return bcrypt.hash(input, 10);
    };
    compare (input, hashedOutput) {
        return bcrypt.compare(input, hashedOutput);
    };
}

module.exports = CryptoService;
