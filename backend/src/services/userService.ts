import pool from '../confiq/db.connect'
import { User } from '../types/User'

export const createUserService = async (
  data: Omit<User, 'id' | 'created_at'>,
): Promise<User> => {
  // ✅ explicit Promise<User>
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, created_at;
  `
  const values = [data.name, data.email]
  const result = await pool.query<User>(query, values)
  return result.rows[0]
}

export const getAlluserService = async (): Promise<User[]> => {
  const query = `SELECT * from users`
  const result = await pool.query(query)
  return result.rows
}

export const getSingleUserService = async (id: number): Promise<User> => {
  const query = `SELECT * FROM users WHERE id = $1`
  const result = await pool.query<User>(query, [id])

  if (result.rows.length === 0) {
    throw new Error('User not found')
  }

  return result.rows[0]
}

export const updateUserService = async (
  id: number,
  name?: string,
  email?: string,
): Promise<User> => {
  const query = `UPDATE users 
                 SET name = COALESCE($1, name), 
                     email = COALESCE($2, email) 
                 WHERE id = $3 
                 RETURNING *`

  const values = [name, email, id]

  const result = await pool.query(query, values)

  if (result.rows.length === 0) {
    throw new Error('User not found')
  }

  return result.rows[0] as User
}

export const updateUserdynamicService = async (
  id: number,
  data: Partial<User>,
): Promise<User> => {
  const fields = Object.keys(data) // যেসব field update হবে
  const values = Object.values(data) // field values

  if (fields.length === 0) {
    throw new Error('No fields to update')
  }

  // SET clause dynamic তৈরি করা
  const setClause = fields
    .map((field, index) => `"${field}" = $${index + 1}`)
    .join(', ')

  // id এর জন্য last positional parameter
  const query = `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`

  const result = await pool.query(query, [...values, id])

  if (result.rows.length === 0) {
    throw new Error('User not found')
  }

  return result.rows[0] as User
}

export const deleteUserService = async (id: number): Promise<User> => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING *`

  const result = await pool.query(query, [id])

  if (result.rows.length === 0) {
    throw new Error('User not found')
  }

  return result.rows[0] as User
}
