const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IFriendshipRepository {
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRepository };
