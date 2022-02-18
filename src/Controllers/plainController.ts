const express1 = require('express');
import data from './Schema/MOCK_DATA_MATERIALS.json';

const plainController = express1.Router();
import mongoose from 'mongoose'
import {ordersSchema} from '../Controllers/Schema/orders'
const ordersConnection = mongoose.createConnection('mongodb://localhost:27017/orders')
const orderModel = ordersConnection.model('Order', ordersSchema);

	
plainController.get('/seed', (req:any, res:any) => {
  orderModel.insertMany(data)
  res.json(data) 
}); 
 
plainController.get('/', async (req:any, res:any) => {
  let result =await  orderModel.find({}).lean().exec()
  res.json(result);
  });

  plainController.get('/:uid', async (req:any, res:any) => {
    let {uid} =req.params
    let result =await orderModel.find({ _id: uid}).lean().exec()
    res.json(result);
    });
  
plainController.post('/', async(req:Request, res:any) => {
  let {id} =await new orderModel(req.body).save()

      res.json(id)
    });
  
plainController.put('/:uid', async (req:any, res:any) => {
  let {uid} =req.params
  const body = req.body
  let result = await orderModel.updateOne({_id: uid }, { $set: body }).exec()
  res.json({uid, result})
});

  
plainController.patch('/:uid', async (req:any, res:any) => {
  const { uid } = req.params
  const body = req.body
  let result = await orderModel.findOne({ _id: uid}, {__v: 0}).exec()
  if(result) {
    let result2=await orderModel.findOne({ _id: uid}, {__v: 0}).exec()
    let resp = result2.overwrite(body)
    let result = await orderModel.replaceOne({ _id: uid }, resp).exec();
    res.json(result)
  } else {
    res.sendStatus(404)
  }
});
    
plainController.delete('/:uid', async (req:any, res:any) => {
  const { uid } = req.params
  let result = await orderModel.deleteOne({ _id: uid })
  res.json(result)
}); 


 
	
module.exports = plainController;							