import { Request, Response } from 'express';
import httpStatus from 'http-status';

import User, { UserDocument } from '../models/user.model'; // TODO: add path abbr.
import { isNullish } from '../utils/type-checking';

/**
 * TODO: Check this later
 */
type UserLoginRequest = {
  email: string;
  password: string;
}

/**
 * TODO:
 */
type UserSingUpRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordRepeated: string;
  profilePicture?: Buffer;
};

/**
 * Logs in an user.
 *
 * @param request  The request.
 * @param response The response.
 */
export async function login(request: Request, response: Response): Promise<Response> {
  const { email, password }: UserLoginRequest = request.body; // TODO: change.
  const user = await User.findOne({ 'email': email });

  if (isNullish(user)) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .send('The given credentials were invalid, try again.');
  }

  const isPasswordMatch = password === user.password; // TODO: add better validation.

  if(!isPasswordMatch) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .send('The given credentials were invalid, try again.');
  }

  return response
    .status(httpStatus.OK)
    .send({ 'token': 'TODO:' });
}

export async function signUp(request: Request, response: Response): Promise<Response> {
  const userRequest: UserSingUpRequest = request.body; // TODO: change.

  if (await isUserSignUp(userRequest)) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .send('The email or username already in use.');
  }

  User.create(userRequest);

  return response
    .status(httpStatus.CREATED)
    .send('The user has been created');
}

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
