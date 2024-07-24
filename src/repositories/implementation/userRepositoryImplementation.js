const db = require('../../database/config/db');
const httpStatus = require("../../utils/statusCodes");
const { IUserRepository } = require("../interfaces/userRepositoryAbstract");
const ApiError = require("../../utils/ApiError");

class UserRepositoryImplementation extends IUserRepository{
    async create(fullName, email, hashedPassword) {
        try {
        const [userId] = await db('user').insert({
            full_name: fullName,
            email: email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true,
        });
        return userId;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    }

    getByEmail(email) {
        try {
            return db('user')
                .where({ email: email })
                .first();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a email by id');
        }      
    };
    
    getById(userId){
        try {
            return db('user')
                .select('id', 'full_name', 'email', 'password')
                .where({ id: userId })
                .first();
        } catch (error) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Error while getting user by id');
        }
    };
    
    getAll(){
        try {
            return db('user')
                .select('id', 'full_name', 'email')
                .where({ is_active: true });
        } catch (error) {
            throw new Error('Error while getting all users');
        }
    };
    
    update(userId, fullName, email) {
        try {
            db('user')
                .where({ id: userId })
                .update({
                    full_name: fullName,
                    email: email,
                    updated_at: new Date()
                });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating user');
        }
    };
    
    delete (userId) {
        try {
            db('user')
                .where({ id: userId })
                .update({ is_active: false });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting user');
        }
    };
    
    getFeedNews(userId) {
        try {
            return db.raw(`
                SELECT
                    post_id,
                    post_description,
                    created_at,
                    JSON_OBJECT(
                            'id', post_author_id,
                            'name', post_author
                    ) AS author,
                    JSON_OBJECT(
                        'likes', SUM(IF(reaction_type = 'like' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'love', SUM(IF(reaction_type = 'love' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'hahah', SUM(IF(reaction_type = 'hahah' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'angry', SUM(IF(reaction_type = 'angry' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'wow', SUM(IF(reaction_type = 'wow' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'sad', SUM(IF(reaction_type = 'sad' AND reaction_quantity IS NOT NULL, reaction_quantity, 0))
                    ) AS reactions,
                    comment_quantity
                FROM
                    (SELECT
                         P.id AS post_id,
                         P.description AS post_description,
                         P.created_at,                         
                         F.friend_id AS post_author_id,
                         UF.full_name AS post_author,
                         R.reaction_type,
                         R.reaction_quantity,
                         (
                             SELECT COUNT(id)
                             FROM comment
                             WHERE post_id = P.id
                         ) AS comment_quantity
    
                    FROM user AS U
                            INNER JOIN
                        friendship AS F
                        ON (U.id = F.principal_user_id AND F.is_active = 1)
                              INNER JOIN
                        post AS P
                        ON (F.friend_id = P.user_id AND P.is_active = 1)
                             INNER JOIN
                        user AS UF
                        ON (F.friend_id = UF.id)
                            LEFT JOIN
                        (
                            SELECT
                                R.post_id,
                                COUNT(R.id) AS reaction_quantity,
                                RT.description AS reaction_type
                            FROM reaction AS R
                                    JOIN reaction_type AS RT ON R.reaction_type_id = RT.id
                            GROUP BY R.post_id, RT.description
                        ) AS R ON R.post_id = P.id
                    WHERE U.id = :userId) AS subquery
                GROUP BY post_id, post_description, created_at, comment_quantity
                ORDER BY post_id`, { userId: userId }
            );
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a feed');
        }
    };
    
    getPostStatistics() {
        try {
            return db.raw(`
                SELECT
                    post_id,
                    post_description,
                    created_at,
                    JSON_OBJECT(
                            'id', post_author_id,
                            'name', post_author
                    ) AS author,
                    JSON_OBJECT(
                        'likes', SUM(IF(reaction_type = 'like' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'love', SUM(IF(reaction_type = 'love' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'hahah', SUM(IF(reaction_type = 'hahah' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'angry', SUM(IF(reaction_type = 'angry' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'wow', SUM(IF(reaction_type = 'wow' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'sad', SUM(IF(reaction_type = 'sad' AND reaction_quantity IS NOT NULL, reaction_quantity, 0))
                    ) AS reactions,
                    comment_quantity
                FROM
                    (SELECT
                         P.id AS post_id,
                         P.description AS post_description,
                         P.created_at,
                         F.friend_id AS post_author_id,
                         UF.full_name AS post_author,
                         R.reaction_type,
                         R.reaction_quantity,
                         (
                             SELECT COUNT(id)
                             FROM comment
                             WHERE post_id = P.id
                         ) AS comment_quantity
    
                    FROM user AS U
                            INNER JOIN
                        friendship AS F
                        ON (U.id = F.principal_user_id AND F.is_active = 1)
                              INNER JOIN
                        post AS P
                        ON (F.friend_id = P.user_id AND P.is_active = 1)
                             INNER JOIN
                        user AS UF
                        ON (F.friend_id = UF.id)
                            LEFT JOIN
                        (
                            SELECT
                                R.post_id,
                                COUNT(R.id) AS reaction_quantity,
                                RT.description AS reaction_type
                            FROM reaction AS R
                                    JOIN reaction_type AS RT ON R.reaction_type_id = RT.id
                            GROUP BY R.post_id, RT.description
                        ) AS R ON R.post_id = P.id
                    WHERE U.is_active = 1) AS subquery
                GROUP BY post_id, post_description, created_at, comment_quantity
                ORDER BY post_id`
            );
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a post statistics');
        }
    };
}

module.exports = UserRepositoryImplementation;
