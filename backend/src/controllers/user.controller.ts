import bcrypt from 'bcrypt';

import User from '../models/user.model'; // TODO: add path abbr.
import { isNullish } from '../utils/type-checking';

/**
 * TODO: Check this later
 */
export type UserLoginRequest = {
  email: string;
  password: string;
}

/**
 * TODO:
 */
export type UserSingUpRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  profilePicture?: Buffer;
};

/**
 * Indicates whether the user exists or not.
 *
 * @param userRequest The user sign up request.
 */
async function isUserSignUp(userRequest: UserSingUpRequest): Promise<boolean> {
  const user = await User.findOne({
    '$or': [
      { 'email': userRequest.email },
      { 'username': userRequest.username }
    ]
  });

  return !isNullish(user);
}

/**
 * The user business logic.
 */
export class UserController {
  // FIXME: function names could be agnostic from implementation.
  // FIXME: add missing jsdoc of thrown errors.
  /**
   * Logs in an user.
   *
   * @param request  The request.
   * @param response The response.
   */
  public async login(request: UserLoginRequest): Promise<void> { // TODO: explain why static
    const user = await User.findOne({ 'email': request.email });

    if (isNullish(user)) {
      throw new Error('The given credentials were invalid, try again.');
    }

    const isPasswordMatch = await bcrypt.compare(request.password, user.password);

    if(!isPasswordMatch) {
      throw new Error('The given credentials were invalid, try again.');
    }
  }

  /**
   * Signs up an user.
   *
   * @param request  The request.
   * @param response The response.
   */
  public async signUp(request: UserSingUpRequest): Promise<void> {
    if (await isUserSignUp(request)) {
      throw new Error('The email or username already in use.');
    }

    User.create(request);
  }
}
