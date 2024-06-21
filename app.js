require("express-async-errors");
const express = require("express");
const errorHandler = require("./src/middlewares/error");
const configureUserContainer = require("./src/features/userContainer");
const configureTargetPublicContainer = require("./src/features/targetPublicContainer");
const configureReactionTypeContainer = require("./src/features/reactionTypeContainer");
const configureReactionContainer = require("./src/features/reactionContainer");
const configurePostContainer = require("./src/features/postContainer");
const configureFriendshipContainer = require("./src/features/friendshipContainer");
const configureFileTypeContainer = require("./src/features/fileTypeContainer");
const configureCommentContainer = require("./src/features/commentContainer");
const configureAlbumItemContainer = require("./src/features/albumItemContainer");
const configureAlbumContainer = require("./src/features/albumContainer");
const configureFriendshipRequestTypeContainer = require("./src/features/friendshipRequestTypeContainer");
const configureFriendshipRequestContainer = require("./src/features/friendshipRequestContainer");

const app = express();
const { userRoutes } = configureUserContainer();
const { targetPublicRoutes } = configureTargetPublicContainer();
const { reactionTypeRoutes } = configureReactionTypeContainer();
const { reactionRoutes } = configureReactionContainer();
const { postRoutes } = configurePostContainer();
const { friendshipRoutes } = configureFriendshipContainer();
const { fileTypeRoutes } = configureFileTypeContainer();
const { commentRoutes } = configureCommentContainer();
const { albumItemRoutes } = configureAlbumItemContainer();
const { albumRoutes } = configureAlbumContainer();
const { friendshipRequestTypeRoutes } = configureFriendshipRequestTypeContainer();
const { friendshipRequestRoutes } = configureFriendshipRequestContainer();

app.use(express.json());
app.use('/reactions', reactionRoutes);
app.use('/users', userRoutes);
app.use('/friendship',friendshipRoutes);
app.use('/friendship_request_type', friendshipRequestTypeRoutes);
app.use('/friendship_request', friendshipRequestRoutes);
app.use('/file_type', fileTypeRoutes);
app.use('/target_public', targetPublicRoutes);
app.use('/album', albumRoutes);
app.use('/post', postRoutes);
app.use('/album_item', albumItemRoutes);
app.use('/reactions_type', reactionTypeRoutes);
app.use('/comments', commentRoutes);
app.use('/', userRoutes);

app.use(errorHandler);

module.exports = app;
