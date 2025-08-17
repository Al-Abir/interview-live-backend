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
