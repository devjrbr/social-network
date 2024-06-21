const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class ITokenRepository {
    constructor() {
        assertIsConcreteInstance(this, ITokenRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getTokenByUserId');
        assertMethodImplemented(this, 'revokeTokenByUserId');
        assertMethodImplemented(this, 'updateById');
    }
}

module.exports = { ITokenRepository };
