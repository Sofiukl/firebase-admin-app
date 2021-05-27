const FIREBASE_DATABASE_URL = 'https://fir-admin-c89ed-default-rtdb.firebaseio.com';
const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')

const init = () => {
  console.log(`FIREBASE_DATABASE_URL: ${JSON.stringify(FIREBASE_DATABASE_URL)}`)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL
  })
}

init()

const allUserList = () => {
  const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    return admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        const arr = listUsersResult.users.map((userRecord) => {
          const { uid, email, passwordHash, passwordSalt } = userRecord.toJSON()
          return { uid, email, passwordHash, passwordSalt }
        })
        return arr
      })
      .catch((error) => error.message || 'Could not fetch')
  }
  return listAllUsers()
}

const create = (obj) => {
  return admin
    .auth()
    .createUser(obj)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid)
      return userRecord.uid
    })
    .catch((error) => error.message || 'Could not create')
}

const update = (uid, obj) => {
  return admin
    .auth()
    .updateUser(uid, obj)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      const { uid, email, passwordHash, passwordSalt } = userRecord.toJSON()
      return { uid, email, passwordHash, passwordSalt }
    })
    .catch((error) => error.message || 'Could not update')
}

const remove = (uid) => {
  return admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return
    })
    .catch((error) => error.message || 'Could not delete')
}

const firebaseUtil = {
  allUserList,
  create,
  update,
  delete: remove
}
module.exports = firebaseUtil
