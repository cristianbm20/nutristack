import { validateUser } from '../schemas/users'

export class UsersController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create = (req, res) => {
    const user = req.body
    const { data, error } = validateUser(user)
    if (error) {
      res.status(400).json({ error: error.errors })
    } else {
      res.status(201).json({ data })
    }
  }

  login = async (req, res) => {
    const { email } = req.params
    const user = await this.movieModel.getByEmail({ email })

    if (user) return res.json(email)
    res.status(404).json({ message: 'User not exists' })
  }
}
