//CRUD operations Derived from AU course Advanced Backend lecture 2
const express = require('express')
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ireservation, reservations_Schema } from '../Models/reservation_Schema'
import {getRole,getEmail} from "./authenticationController"


export const reservationsController = express.Router();
const reservationsConnection = mongoose.createConnection('mongodb://localhost:27017/hotel')
const reservationsModel = reservationsConnection.model('Reservation', reservations_Schema)

/*
Reservations
  - `GET /reservations`–list all reservation. Accessible for roles `manager` and `clerk`. It should be possible to filter based dates (from, to and from-to)
  - `GET /reservations/{:uid}`-view reservation details. Accessible for roles `manager`, `clerk`, and `guest` (if created by `guest`)
  - `POST /reservations/{:uid}`–create reservation. Accessible for roles `manager`, `clerk`, and `guest` 
  - `PATCH /reservations/{:uid}`—modify reservation. Accessible for roles `manager`, `clerk`, and `guest` (if created by `guest`) 
  - `DELETE /reservations/{:uid}`–delete reservation. Accessible for roles `manager`, `clerk`

*/

const read = async (req: Request, res: Response) => {
if(getRole(req)!=='manager'&&getRole(req)!=='clerk') { return res.status(400).send("Not correct Role")}
  let result = await reservationsModel.find({}, { __v: 0}).sort('reservationStart').lean().exec()
  res.json(result)
}

const create =  async (req: Request, res: Response) => {
  let filters= { room_number: {$eq: req.body.room_number},
                reservationEnd:{$gt: req.body.reservationStart},
                reservationStart:{$lt: req.body.reservationEnd}}

let conflicts=await reservationsModel.find(filters).lean().exec()
    if(conflicts.length<1) {
        let { id } = await new reservationsModel(req.body).save()
        res.json(id )
    }
    else(res.status(400).json(conflicts))
}

const readOne = async (req: Request, res: Response) => {
  const { uid } = req.params
  let result:ireservation = await reservationsModel.findOne({ _id: uid }, { __v: 0}).exec()
  if(getRole(req)!=='manager'&&getRole(req)!=='clerk') { 
      if(getEmail(req)!==result.customerEmail) {return res.status(400).send(getEmail(req)+ " != " + result.customerEmail)}}//result.customerEmail er noget lort
//else:
  res.json(result)
}



const update = async (req: Request, res: Response) => {
  const { uid } = req.params
  const body = req.body
  let result = await reservationsModel.updateOne({_id: uid }, { $set: body }).exec()
  if(getRole(req)!=='manager' && getRole(req)!=='clerk') { 
    if(getEmail(req)!==result.customerEmail) {return res.status(400).send("This is not your reservation")}}
  res.json({uid, result})
}

const remove = async (req: Request, res: Response) => {
    if(getRole(req)!=='manager'&&getRole(req)!=='clerk') { return res.status(400).send("Not correct Role")}
    const { uid } = req.params
    let result = await reservationsModel.deleteOne({ _id: uid })
    res.json(result)
}
export const reservation ={
  read,
  readOne,
  create,
  update,
  remove
}
