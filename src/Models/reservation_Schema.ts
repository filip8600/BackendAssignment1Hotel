import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface reservation 
{
    room_number:Number,
    totalPrice: Number,
    reservationStart: Date,
    reservationEnd: Date,
    customerEmail: String
}

export const reservations_Schema = new Schema<reservation>({
    "room_number": {type:Number, required: true },
    "totalPrice":{type:Number},
    "reservationStart":{type:Date, required: true },
    "reservationEnd":{type:Date, required: true },
    "customerEmail":{type:String, required: true },
})