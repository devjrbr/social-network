const { assertIsInstanceOfContract } = require("./interfaces/validation");

class UserRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    create(fullName, email, hashedPassword) {
        return this.repository.create(fullName, email, hashedPassword);
    };
    getByEmail(email) {
        return this.repository.getByEmail(email);
    };
    getById(userId){
       return this.repository.getById(userId);
    };
    getAll(){
        return this.repository.getAll();
    };
    update(userId, fullName, email, hashedPassword) {
        this.repository.update(userId, fullName, email, hashedPassword);
    };
    delete (userId) {
        this.repository.delete(userId);
    };
    getFeedNews(userId) {
        return this.repository.getFeedNews(userId);
    };
    getPostStatistics() {
        return this.repository.getPostStatistics();
    };
}

module.exports = UserRepository;
