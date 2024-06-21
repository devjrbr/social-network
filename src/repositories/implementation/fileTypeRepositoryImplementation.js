const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFileTypeRepository } = require("../interfaces/fileTypeRepositoryAbstract");

class FileTypeRepositoryImplementation extends IFileTypeRepository {
    async create(type) {
        try {
            const [fileType] = await db.transaction(async (trx) => {
                return db('file_type')
                    .transacting(trx)
                    .insert({
                        type,
                        is_active: true
                    });
            });
            return fileType;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a new file type');
        }
    };

    async getAll(){
        return db('file_type')
            .select('id', 'type', 'is_active');
    };

    async getById(id){
        return db('file_type')
            .where({ id })
            .select('id', 'type', 'is_active')
            .first();
    };

    async delete (id) {
        try {
            await db.transaction(async (trx) => {
                await db('file_type')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting a file type');
        }
    };
}

module.exports = FileTypeRepositoryImplementation;
