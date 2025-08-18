import { Request, Response, NextFunction } from 'express'
import {
  createUserService,
  deleteUserService,
  getAlluserService,
  getSingleUserService,
  updateUserdynamicService,
  updateUserService,
} from '../services/userService'

export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newUser = await createUserService(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const allUser = await getAlluserService()

    res.status(200).json({
      message: true,
      data: allUser,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const user = await getSingleUserService(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const { name, email } = req.body
    const user = await updateUserService(id, name, email)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUserdynamic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const user = await updateUserdynamicService(id, data)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const userDelete = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    const deletedUser = await deleteUserService(id)

    res.json({
      message: 'User deleted successfully',
      data: deletedUser,
    })
  } catch (error) {
    next(error)
  }
}
