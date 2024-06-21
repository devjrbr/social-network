const yup = require('yup');

const createFriendshipRequestSchema = yup.object({
    authorization: yup.string().required(),
    receiver_id: yup.number().integer().required()
});
const seeAllFriendshipRequestsSchema = yup.object({
    authorization: yup.string().required()
});
const acceptFriendshipRequestSchema = yup.object({
    authorization: yup.string().required(),
    id: yup.number().integer().required(),
    sender_id: yup.number().integer().required()
});
const rejectFriendshipRequestSchema = yup.object({
    authorization: yup.string().required(),
    id: yup.number().integer().required()
});

module.exports = {
    createFriendshipRequestSchema,
    seeAllFriendshipRequestsSchema,
    acceptFriendshipRequestSchema,
    rejectFriendshipRequestSchema
};
