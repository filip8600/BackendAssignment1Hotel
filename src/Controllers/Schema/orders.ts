import mongoose from 'mongoose';
const { Schema } = mongoose;


interface adress{
    street_name: String,
    street_number: Number,
    city: String
}
interface delivery{
    first_name: String,
    last_name: Date,
    address: adress
}
export interface order 
{
    material:  String, // String is shorthand for {type: String}
    amount: Number,
    currency:   String,
    price: Number,
    timestamp: Date,
    "delivery": "delivery"
}

const adressSchema = new Schema({
        "street_name": {type: String},
        "street_number": {type: Number},
        "city": {type: String}
        })


const deliverySchema = new Schema({
    "first_name": {type: String},
    "last_name": {type: String},
    "address": adressSchema
    })

export const ordersSchema = new Schema<order>({
  "material": {type: String}, // String is shorthand for {type: String}
  "amount": Number,
  "currency":   {type: String},
  "price": {type: Number},
  "timestamp": {type: Date},
  "delivery": deliverySchema
});