const { assertIsInstanceOfContract } = require("./interfaces/validation");

class UserRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(full_name, email, hashedPassword) {
        return this.repository.create(full_name, email, hashedPassword);
    };
    async getByEmail(email) {
        return this.repository.getByEmail(email);
    };
    async getById(id){
       return this.repository.getById(id);
    };
    async getAll(){
        return this.repository.getAll();
    };
    async update(id, full_name, email, hashedPassword) {
        this.repository.update(id, full_name, email, hashedPassword);
    };
    async delete (userId) {
        this.repository.delete(userId);
    };
    async getFeedNews(userId) {
        return this.repository.getFeedNews(userId);
    };
    async getPostStatistics() {
        return this.repository.getPostStatistics();
    };
}

module.exports = UserRepository;
