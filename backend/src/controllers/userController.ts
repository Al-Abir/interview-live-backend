import { Request, Response } from 'express'
import { createUserService } from '../services/userService'

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
