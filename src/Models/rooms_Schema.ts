import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface room 
{
    room_number:Number,
    price: Number,
    private_bathroom: boolean
}

export const rooms_Schema = new Schema<room>({
    "room_number": {type:Number, required: true },
    "price":{type:Number, required: true },
    "private_bathroom":{type:Boolean, required: true }
})
