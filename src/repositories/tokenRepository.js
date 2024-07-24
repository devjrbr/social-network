const { assertIsInstanceOfContract } = require("./interfaces/validation");

class TokenRepository {
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    };
    create(token, userId) {
        return this.repository.create(token, userId);
    };
    getTokenByUserId(userId) {
        return this.repository.getTokenByUserId(userId);
    };
    revokeTokenByUserId(userId){
        return this.repository.revokeTokenByUserId(userId);
    };
    updateById(tokenId, newToken){
        return this.repository.updateById(tokenId, newToken);
    };
}

module.exports = TokenRepository;
