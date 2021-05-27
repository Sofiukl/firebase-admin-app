const { userListController, createUserController, updateUserController, deleteUserController } = require('../controllers/userController');

const callController  = require('../middlewares')

const getEndPoint = (subPath) => `/user/${subPath}`

module.exports = ({ app }) => {
  app.get(getEndPoint('user-list'), callController(userListController))
  app.post(getEndPoint('user-create'), callController(createUserController))
  app.post(getEndPoint('user-update'), callController(updateUserController))
  app.post(getEndPoint('user-delete'), callController(deleteUserController))
}

