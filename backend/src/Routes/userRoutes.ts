import express from 'express'
import {
  createUserController,
  getAllUser,
  getSingleUser,
  updateUser,
  updateUserdynamic,
  userDelete,
} from '../controllers/userController'

const router = express.Router()

router.post('/createUser', createUserController)
router.get('/user', getAllUser)
router.get('/user/:id', getSingleUser)
router.put('/user/:id', updateUser)
router.put('/user/dynamic/:id', updateUserdynamic)
router.delete('/user/:id', userDelete)

export default router
