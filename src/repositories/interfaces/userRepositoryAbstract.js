const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class IUserRepository {
    constructor() {
        assertIsConcreteInstance(this, IUserRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getByEmail');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
        assertMethodImplemented(this, 'getFeedNews');
        assertMethodImplemented(this, 'getPostStatistics');
    }
}

module.exports = { IUserRepository };
