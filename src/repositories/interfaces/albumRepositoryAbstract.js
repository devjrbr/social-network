const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IAlbumRepository {
    constructor() {
        assertIsConcreteInstance(this, IAlbumRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IAlbumRepository };
