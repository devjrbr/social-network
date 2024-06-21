const { assertIsConcreteInstance, assertMethodImplemented} = require("./validation");

class IAlbumItemRepository {
    constructor() {
        assertIsConcreteInstance(this, IAlbumItemRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IAlbumItemRepository };
