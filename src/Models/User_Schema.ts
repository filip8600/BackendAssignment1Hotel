// Derived from AU course "Advanced Backend" lecture 3 example
import mongoose from 'mongoose';
const { Schema } = mongoose;
import { DIGEST, ITERATIONS, KEY_LENGTH, pbkdf2 } from '../utils/auth-crypto'
import { compare, genSalt, hash } from 'bcrypt'



export interface User {
  name: Name
  password: Password
  email: string
  role: string
}

export interface Name {
  first: string
  middle?: string
  last?: string
}

export interface Password {
  hash: string
  salt: string
  setPassword(hash: string, salt: string): void
  isPasswordValid(password: string): boolean
}

export const NameSchema = new Schema<Name>({
  first: { type: String, required: true },
  middle: { type: String },
  last: { type: String }
})

export const PasswordSchema = new Schema<Password>({
  hash: { type: String, required: true },
  salt: { type: String, required: true }
})

PasswordSchema.methods.isPasswordValid = async function (password: string, hash1: string) {
  return await compare(password, hash1)
  // return this.hash === hash.toString('hex')
}

PasswordSchema.methods.setPassword = function (hash: string, salt: string) {
  this.hash = hash
  this.salt = salt
}

export const userSchema = new Schema<User>({
  name: { type: NameSchema, required: true },
  password: { type: PasswordSchema, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true }
})