const FileTypeRepositoryImplementation = require("../repositories/implementation/fileTypeRepositoryImplementation");
const FileTypeRepository = require("../repositories/fileTypeRepository");
const FileTypeService = require("../services/fileTypeService");
const FileTypeController = require("../controller/fileTypeController");
const createFileTypeRoutes = require("../routes/fileTypeRoutes");
const { IFileTypeRepository } = require("../repositories/interfaces/fileTypeRepositoryAbstract");


function configureFileTypeContainer() {
    const fileTypeRepositoryImplementation = new FileTypeRepositoryImplementation();
    const fileTypeRepository = new FileTypeRepository(fileTypeRepositoryImplementation, IFileTypeRepository);
    const fileTypeService = new FileTypeService(fileTypeRepository);
    const fileTypeController = new FileTypeController(fileTypeService);
    const fileTypeRoutes = createFileTypeRoutes(fileTypeController);
    return { fileTypeRoutes }
}

module.exports = configureFileTypeContainer;
