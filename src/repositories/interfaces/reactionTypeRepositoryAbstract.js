const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

class IReactionTypeRepository {
    constructor() {
        assertIsConcreteInstance(this, IReactionTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IReactionTypeRepository };
