const { assertIsInstanceOfContract } = require("./interfaces/validation");

class FileTypeRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(newFileType) {
        return this.repository.create(newFileType);
    };
    getAll(){
        return this.repository.getAll();
    };
    getById(fileTypeId){
        return this.repository.getById(fileTypeId);
    }
    delete (fileTypeId) {
        this.repository.delete(fileTypeId);
    };
}

module.exports = FileTypeRepository;
