const userList =
  ({ allUserList }) =>
  () =>
    allUserList()
      .then((users) => ({
        isSuccess: true,
        data: users
      }))
      .catch((err) => err.message)

module.exports = userList
