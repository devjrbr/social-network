const yup = require('yup');
const userSchema = yup.object({
    id: yup.string().required()
});

module.exports =  userSchema;
