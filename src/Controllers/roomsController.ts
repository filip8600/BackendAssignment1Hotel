const express = require('express')
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { rooms_Schema } from '../Models/rooms_Schema'

export const roomsController = express.Router();
const roomsConnection = mongoose.createConnection('mongodb://localhost:27017/hotel')
const roomsModel = roomsConnection.model('Room', rooms_Schema)

/*
Rooms
  - `GET /rooms`–list all rooms. Accessible for roles `manager`, `clerk`, and `guest`. It should be possible to filter based on availability
  - `GET /rooms/{:uid}`–view room details. Accessible for roles `manager`, `clerk`, amd `guest`
  - `POST /rooms/{:uid}`–create room. Accessible for roles `manager`
  - `PATCH /rooms/{:uid}`–modify room. Accessible for roles `manager`, `clerk`
  - `DELETE /rooms/{:uid}`–delete room. Accessible for roles `manager`;
*/

const read = async (req: Request, res: Response) => {
  let result = await roomsModel.find({}, { __v: 0}).lean().exec()
  res.json(result)
}

const create =  async (req: Request, res: Response) => {
  let { id } = await new roomsModel(req.body).save()
  res.json({ id })
}
/*JSON sample: {
    "room_number": 101,
    "price":1200,
    "private_bathroom": true
}*/

// module.exports = roomsController;
export const room ={
  read,
  create
}

/*
export const create = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  if(await userExists(email)) {
    res.status(400).json({
      "message": "User already exists"
    });
  } else {
    let salt = await randomBytes(SALT_LENGTH);
    let hashed = await pbkdf2(password, salt.toString('hex'), ITERATIONS, KEY_LENGTH, DIGEST)
    let user = newUser(email, name);
    user.password.setPassword(hashed.toString('hex'), salt.toString('hex'))
    await user.save()
    res.json(user)
  }
}

export const create_bcrypt =  async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if(await userExists(email)) {
    res.status(400).json({
      "message": "User already exists"
    });
  } else {
    const salt = await genSalt(ROUNDS)
    const hashed = await hash(password, salt)
    let user = newUser(email, name);
    user.password.setPassword(hashed, salt)
    await user.save()
    res.json(user)
  }
}

export const check = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await UserModel.findOne({ email }).exec()
  if(user) {
    if(await user.password.isPasswordValid(password)) {
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(400)
  }
}

export const check_bcrypt = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await UserModel.findOne({ email }).exec()
  if(user) {
    if(await compare(password, user.password.hash)) {
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(400)
  }
}

const userExists = (email: string) => UserModel.findOne({ email }).exec()

const newUser = (email: string, name: Name) => new UserModel({ 
  email, 
  name, 
  password: {
    hash: '',
    salt: ''
  }
}) */