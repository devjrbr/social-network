const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IFriendshipRequestTypeRepository {
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRequestTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRequestTypeRepository };
