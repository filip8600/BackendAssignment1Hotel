// Derived from AU course "Advanced Backend" lecture 3 example
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { compare, genSalt, hash } from 'bcrypt'

import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'
import { Name, userSchema } from '../Models/User_Schema'
import { getRole } from './authenticationController'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/hotel')
const UserModel = usersConnection.model('User', userSchema)

export const getAllUsers = async (req: Request, res: Response) => {
  if (getRole(req) !== 'manager') { return res.status(400).send("Not correct Role") }
  let result = await UserModel.find({}, { __v: 0 }).lean().exec()
  res.json(result)
}

const getOne = async (req: Request, res: Response) => {
  const { uid } = req.params
  let result = await UserModel.find({ _id: uid }, { __v: 0 }).exec()
  res.json(result)
}

export const create_bcrypt = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  if (await userExists(email)) {
    res.status(400).json({
      "message": "User already exists"
    });
  } else {
    const salt = await genSalt(ROUNDS)
    const hashed = await hash(password, salt)
    let user = newUser(email, name, role);
    user.password.setPassword(hashed, salt)
    await user.save()
    res.json(user)
  }
}

export const check_bcrypt = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await UserModel.findOne({ email }).exec()
  if (user) {
    if (await compare(password, user.password.hash)) {
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(400)
  }
}

const userExists = (email: string) => UserModel.findOne({ email }).exec()

const newUser = (email: string, name: Name, role: string) => new UserModel({
  email,
  name,
  password: {
    hash: '',
    salt: ''
  },
  role
})

export const user = {
  getAllUsers,
  getOne,
  create_bcrypt,
  check_bcrypt
}