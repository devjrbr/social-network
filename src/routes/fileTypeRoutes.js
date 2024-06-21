const express = require('express');
const validateSchema = require("../middlewares/fileTypeValidation");
const { createFileTypeSchema, getByIdSchema } = require("../schemas/fileTypeSchema");

function createFileTypeRoutes(fileTypeController) {
    const router = express.Router();
    router.post('/', validateSchema(createFileTypeSchema), fileTypeController.createFileType.bind(fileTypeController));
    router.get('/', fileTypeController.getFileTypes.bind(fileTypeController));
    router.delete('/:id', validateSchema(getByIdSchema), fileTypeController.deleteFileType.bind(fileTypeController));
    return router
}

module.exports = createFileTypeRoutes;
