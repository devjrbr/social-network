const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class IReactionRepository {
    constructor() {
        assertIsConcreteInstance(this, IReactionRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IReactionRepository };
