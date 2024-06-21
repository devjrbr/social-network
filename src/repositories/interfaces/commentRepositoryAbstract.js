const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class ICommentRepository {
    constructor() {
        assertIsConcreteInstance(this, ICommentRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { ICommentRepository };
