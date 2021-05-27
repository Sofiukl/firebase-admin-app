const { isValidEmailAddress } = require('../../helper/utility');
const firebaseUtil = require('../../helper/firebase');

const userList = require('./userList');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

const userListUseCase = userList({ allUserList: firebaseUtil.allUserList })
const createUseCase = createUser({ create: firebaseUtil.create, isValidEmailAddress })
const updateUseCase = updateUser({ update: firebaseUtil.update, isValidEmailAddress })
const deleteUseCase = deleteUser({ deleteUser: firebaseUtil.delete })

module.exports = { userListUseCase, createUseCase, updateUseCase, deleteUseCase }
