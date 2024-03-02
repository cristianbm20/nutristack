import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'nutristack'
}

// const PROD_CONFIG = {
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USERNAME,
//   port: process.env.PORT,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME
// }

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel {
  static async getByEmail ({ email }) {
    const [users] = await connection.query(
      'SELECT email, password FROM users WHERE email = ?;',
      [email]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async create ({ input }) {
    const {
      name,
      username,
      phone,
      email,
      password
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    const insertQuery = `INSERT INTO users (id, name, surname, phone, email, password) VALUES (UUID_TO_BIN('${uuid}'), ?, ?, ?, ?, ?);`

    try {
      await connection.query(insertQuery, [
        name,
        username,
        phone,
        email,
        password
      ])
    } catch (error) {
      throw new Error('Creating user error')
    }

    const userQuery =
      'SELECT name, surname, phone, email, password, BIN_TO_UUID(users.id) id FROM users WHERE id = UUID_TO_BIN(?);'

    const [user] = await connection.query(userQuery, [uuid])

    return user[0]
  }
}
