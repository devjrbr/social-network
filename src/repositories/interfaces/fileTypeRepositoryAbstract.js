const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IFileTypeRepository {
    constructor() {
        assertIsConcreteInstance(this, IFileTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFileTypeRepository };
