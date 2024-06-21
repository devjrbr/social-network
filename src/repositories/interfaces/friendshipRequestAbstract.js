const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IFriendshipRequestRepository {
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRequestRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'accept');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRequestRepository };
