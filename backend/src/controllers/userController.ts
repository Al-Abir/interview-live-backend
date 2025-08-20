import { Request, Response, NextFunction } from 'express'
import {
  createUserService,
  deleteUserService,
  getAlluserService,
  getSingleUserService,
  updateUserdynamicService,
  updateUserService,
} from '../services/userService'
import { User } from '../types/User'
import { createUserSchema } from '../ZodValidation/create.user'

export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validatedData = createUserSchema.parse(req.body)
    const newUser = await createUserService(validatedData)
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

/*Validation library ছাড়া runtime safety

Zod ছাড়া মূলভাবে runtime safety করতে হলে আপনাকে:

Allowed fields filter করতে হবে

Field type manually check করতে হবে

Extra field / invalid type handle করতে হবে

Zod/other validation library ব্যবহার করলে এই সব কাজ এক লাইনে ও clean হয়।
*/
export const updateUserdynamic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const allowedFields = ['name', 'email']
    const updateFields: Partial<User> = {}

    Object.keys(data).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields[key as keyof User] = data[key]
      }
    })

    const user = await updateUserdynamicService(id, updateFields) // ✅ filtered object পাঠানো
    res.json(user)
  } catch (error) {
    next(error)
  }
}
/*export const updateUserdynamic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    // destructure না করে full body নিলাম
    const data = req.body

    // উদাহরণ: শুধুমাত্র যেগুলো আসছে সেগুলো পাঠাব
    const updateFields: { name?: string; email?: string } = {}

    if (data.name !== undefined) {
      updateFields.name = data.name
    }

    if (data.email !== undefined) {
      updateFields.email = data.email
    }

    const user = await updateUserdynamicService(id, updateFields)
    res.json(user)
  } catch (error) {
    next(error)
  }
}
  */
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
