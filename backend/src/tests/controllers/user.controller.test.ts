import User from '../../models/user.model';
import { UserController, UserLoginRequest, UserSingUpRequest } from '../../controllers/user.controller';

jest.mock('../../models/user.model');

describe('user-controller', () => {
  const UserMocked = jest.mocked(User);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should login an user', async () => {
    const controller = new UserController();
    const user: UserLoginRequest = {
      "email": "test@test.com",
      "password": "unsecuredpassword1"
    };

    UserMocked.findOne.mockResolvedValue(user);

    await expect(controller.login(user)).resolves.toStrictEqual(undefined);
  });

  it('should throw when trying to login a nonexisting user', async () => {
    const controller = new UserController();
    const user: UserLoginRequest = {
      "email": "test@test.com",
      "password": "unsecuredpassword1"
    };

    UserMocked.findOne.mockResolvedValue(null);

    await expect(controller.login(user)).rejects.toBeInstanceOf(Error);
  });

  it('should sign up a nonexisting user', async () => {
    const controller = new UserController();
    const user: UserSingUpRequest = {
      "name": "test 1",
      "email": "test@test.com",
      "username": "usertest1",
      "password": "unsecuredpassword1"
    };

    UserMocked.findOne.mockResolvedValue(null);

    await expect(controller.signUp(user)).resolves.toStrictEqual(undefined);
  });

  it('should throw an error when trying to sign up an existing user', async () => {
    const controller = new UserController();
    const user: UserSingUpRequest = {
      "name": "test 1",
      "email": "test@test.com",
      "username": "usertest1",
      "password": "unsecuredpassword1"
    };

    UserMocked.findOne.mockResolvedValue(user);

    await expect(controller.signUp(user)).rejects.toBeInstanceOf(Error);
  });
});
