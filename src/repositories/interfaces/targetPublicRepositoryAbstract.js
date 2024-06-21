const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class ITargetPublicRepository {
    constructor() {
        assertIsConcreteInstance(this, ITargetPublicRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { ITargetPublicRepository };
