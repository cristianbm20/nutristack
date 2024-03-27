import { UsersController } from './users'
import { validateUser } from '../schemas/users'

jest.mock('../schemas/users', () => ({
  validateUser: jest.fn()
}))

describe('UsersController', () => {
  let usersController
  let userModelMock
  let reqMock
  let resMock

  beforeEach(() => {
    userModelMock = {
      getByEmail: jest.fn()
    }

    usersController = new UsersController({ userModel: userModelMock })

    reqMock = { body: {}, params: {} }
    resMock = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  describe('create method', () => {
    test('should respond with 400 status code when validation fails', () => {
      validateUser.mockReturnValueOnce({ error: { errors: 'Invalid data' } })

      usersController.create(reqMock, resMock)

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({ error: 'Invalid data' })
    })

    test('should respond with 201 status code when validation succeeds', () => {
      validateUser.mockReturnValueOnce({ data: 'Valid data' })

      usersController.create(reqMock, resMock)

      expect(resMock.status).toHaveBeenCalledWith(201)
      expect(resMock.json).toHaveBeenCalledWith({ data: 'Valid data' })
    })
  })

  describe('login method', () => {
    test('should respond with the user email when the user exists', async () => {
      reqMock.params.email = 'user@example.com'
      userModelMock.getByEmail.mockResolvedValueOnce('user@example.com')

      await usersController.login(reqMock, resMock)

      expect(resMock.json).toHaveBeenCalledWith('user@example.com')
    })

    test('should respond with 404 status code when the user does not exist', async () => {
      reqMock.params.email = 'user@example.com'
      userModelMock.getByEmail.mockResolvedValueOnce(null)

      await usersController.login(reqMock, resMock)

      expect(resMock.status).toHaveBeenCalledWith(404)
      expect(resMock.json).toHaveBeenCalledWith({ message: 'User not exists' })
    })
  })
})
