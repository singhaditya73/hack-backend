import process from "node:process"

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret'
export const SALT_ROUNDS = 10