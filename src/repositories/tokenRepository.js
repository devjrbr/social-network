const { assertIsInstanceOfContract } = require("./interfaces/validation");

class TokenRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }
    async create(token, user_id) {
        return this.repository.create(token, user_id);
    };
    async getTokenByUserId(userId) {
        return this.repository.getTokenByUserId(userId);
    };
    async revokeTokenByUserId(userId){
        return this.repository.revokeTokenByUserId(userId);
    }
    async updateById(id, newToken){
        return this.repository.updateById(id, newToken);
    }
}

module.exports = TokenRepository;
