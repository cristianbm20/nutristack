import { createApp } from './app.js'
import { UserModel } from './models/mysql/users.js'

createApp({ userModel: UserModel })
