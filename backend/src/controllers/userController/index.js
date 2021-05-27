const { userListUseCase, createUseCase, updateUseCase, deleteUseCase } = require('../../useCases/userUseCase');

const getUserListController = require('./userListController');
const postCreateUserController = require('./createUserController');
const postUpdateUserController = require('./updateUserController');
const postDeleteUserController = require('./deleteUserController');

const userListController = getUserListController({
  useCase: userListUseCase
})
const createUserController = postCreateUserController({
  useCase: createUseCase
})
const updateUserController = postUpdateUserController({
  useCase: updateUseCase
})
const deleteUserController = postDeleteUserController({
  useCase: deleteUseCase
})

module.exports = { userListController, createUserController, updateUserController, deleteUserController }
