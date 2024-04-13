const express = require("express")
const {
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleEditUserById,
    handleCreateNewuser,
    handleShowDataInHtml } = require("../controllers/usercontroller")
const router = express.Router()


//CRUD operations
router.route('/').get(handleGetAllUsers).post(handleCreateNewuser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleEditUserById)
    .delete(handleDeleteUserById);

//html format
//router.route('/').get(handleShowDataInHtml);

module.exports = router;