const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class IPostRepository {
    constructor() {
        assertIsConcreteInstance(this, IPostRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IPostRepository };
