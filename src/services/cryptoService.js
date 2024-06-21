const bcrypt = require('bcrypt');

class CryptoService {
    async hash (input) {
        return bcrypt.hash(input, 10);
    };

    async compare (input, hashedOutput) {
        return bcrypt.compare(input, hashedOutput);
    }
}

module.exports = CryptoService;
