import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { UserController, UserLoginRequest, UserSingUpRequest } from "../controllers/user.controller";

export class UserService {
  private controller: UserController;

  constructor () {
    this.controller = new UserController();
  }

  /**
   * Logs in an user.
   *
   * @param request  The request.
   * @param response The response.
   *
   * @returns The result response.
   */
  public async login(request: Request, response: Response): Promise<Response> {
    const user: UserLoginRequest = request.body;

    try {
      await this.controller.login(user);

      return response
        .status(httpStatus.OK)
        .send({ 'token': 'TODO:' });
    } catch (error: unknown) {
      // TODO: handle Error
      return response
        .status(httpStatus.BAD_REQUEST)
        .send('The given credentials were invalid, try again.');
    }
  }

  /**
   * Signs up a new user.
   *
   * @param request  The request.
   * @param response The response.
   *
   * @returns The result response.
   */
  public async signUp(request: Request, response: Response): Promise<Response> {
    const user: UserSingUpRequest = request.body; // TODO: change.

    try {
      console.log()
      await this.controller.signUp(user);

      return response
        .status(httpStatus.CREATED)
        .send('The user has been created');
    } catch (error: unknown) {
      // TODO: handle Error

      return response
        .status(httpStatus.BAD_REQUEST)
        .send('The email or username already in use.');
    }
  }
}