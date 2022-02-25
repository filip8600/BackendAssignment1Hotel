// Derived from AU course "Advanced Backend" lecture 3 example
import { sign, verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { readFile } from 'fs'
import { join } from 'path'
import { compare, genSalt, hash } from 'bcrypt'
import { decode } from 'jsonwebtoken'


import mongoose from 'mongoose'
import { userSchema } from '../Models/User_Schema'

/*Authentication
- `GET /users`–list all user IDs
- `GET /users/{:uid}`–view user data
- `POST /user`–create user
- `POST /login`–issue JWT token
*/

const PATH_PRIVATE_KEY = join(__dirname, '..', '..', 'auth-rsa256.key')
const PATH_PUBLIC_KEY = join(__dirname, '..', '..', 'public', 'auth-rsa256.key.pub')

const X5U = 'http://localhost:3000/auth-rsa256.key.pub'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/hotel')
const UserModel = usersConnection.model('User', userSchema)

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await UserModel.findOne({ email }).exec()
  if(user) {
    if(await compare(password,user.password.hash)) {
      readFile(PATH_PRIVATE_KEY, (err, privateKey) => {
        if(err) {
          res.sendStatus(500)
        } else {
         // const isManager=user.role.includes('manager')
          sign({ email, role: user.role }, privateKey, { expiresIn: '1h', header: { alg: 'RS256', x5u: X5U} }, (err, token) => {
            if(err) {
              res.status(500).json({
                message: err.message
              })
            } else {
              res.json({ token })
            }
          })
        }
      })
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(400)
  }
}

export const getRole= (req:Request) =>{
  const token = req.get('authorization')?.split(' ')[1]
  const jwt = decode(token!, { json: true })
  return jwt?.role
}

export const check = (req: Request, res: Response, next:any) => {
  const token = req.get('authorization')?.split(' ')[1]
  if(token==undefined) {return res.status(400).send("No jwt found");}
  readFile(PATH_PUBLIC_KEY, (err, publicKey) => {
    if(err) {
      res.sendStatus(500)
  	} else {
      verify(token , publicKey, { complete: true }, (err, decoded) => {
          if(err) {
            res.status(400).json({
              message: err.message
            })
          } else {
            next()
          }
        })
      }
    })	
	
  
}