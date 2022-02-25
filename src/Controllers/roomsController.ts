//CRUD operations Derived from AU course Advanced Backend lecture 2
const express = require('express')
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { rooms_Schema } from '../Models/rooms_Schema'
import {getRole} from "./authenticationController"


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
  if(getRole(req)!=='manager') { return res.status(400).send("Not correct Role")}
//TODO sorter (filter)
  let { id } = await new roomsModel(req.body).save()
  res.json({ id })

}
/*JSON sample: {
    "room_number": 101,
    "price":1200,
    "private_bathroom": true
}*/
const readOne = async (req: Request, res: Response) => {
  const { uid } = req.params
  let result = await roomsModel.find({ _id: uid }, { __v: 0}).exec()
  res.json(result)
}


const overwrite = async (req: Request, res:Response) => {
  if(getRole(req)!=='manager'&&getRole(req)!=='clerk') { return res.status(400).send("Not correct Role")}
  const { uid } = req.params
  const body = req.body
  let result = await roomsModel.findOne({ _id: uid}, {__v: 0}).exec()
  if(result) {
    let resp:any = result.overwrite(body)
    let replacedResult = await roomsModel.replaceOne({ _id: uid }, resp).exec();
    res.json(replacedResult)
  } else {
    res.sendStatus(404)
  }
}

const update = async (req: Request, res: Response) => {
  if(getRole(req)!=='manager'&&getRole(req)!=='clerk') { return res.status(400).send("Not correct Role")}

  const { uid } = req.params
  const body = req.body
  let result = await roomsModel.updateOne({_id: uid }, { $set: body }).exec()
  res.json({uid, result})
}

const remove = async (req: Request, res: Response) => {
if(getRole(req)!=='manager') { return res.status(400).send("Not correct Role")}
const { uid } = req.params
  let result = await roomsModel.deleteOne({ _id: uid })
  res.json(result)
}
export const room ={
  read,
  readOne,
  create,
  overwrite,
  update,
  remove
}
