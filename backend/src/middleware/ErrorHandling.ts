import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  status?: number 
}
const ErrorHandling = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack)

  const statusCode = err.status || 500
  const message = err.message || 'Something went wrong'

  res.status(statusCode).json({
    status: statusCode,
    message,
    error: err,
  })
}

export default ErrorHandling
