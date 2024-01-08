import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { ConversationController, UserConversationRequest, MessageConversationRequest } from "../controllers/conversation.controller";

type CreateRequestBody = { // TODO: check if this is the best place for it.
  'users': UserConversationRequest[];
  'messages': MessageConversationRequest[];
};

type GetAllByUserBody = { // TODO:
  'user': UserConversationRequest;
}

export class ConversationService {
  private controller: ConversationController;

  constructor () {
    this.controller = new ConversationController();
  }

  /**
   * Creates a conversation request.
   *
   * @param request  The request.
   * @param response The response.
   *
   * @returns The result response.
   */
  public async createRequest(request: Request, response: Response): Promise<Response> {
    const { users, messages }: CreateRequestBody = request.body;

    try {
      await this.controller.create(users, messages);

      return response
        .status(httpStatus.CREATED)
        .send('The conversation request has been created.')
    } catch (error: unknown) {
      // TODO: handle Error

      return response
        .status(httpStatus.BAD_REQUEST)
        .send('The conversation request cannot be created.');
    }
  }

  /**
   * Gets all conversation by user.
   *
   * @param request  The request.
   * @param response The response.
   *
   * @returns The result response.
   */
  public async getAllByUser(request: Request, response: Response): Promise<Response> {
    const { user }: GetAllByUserBody = request.body;

    try {
      const conversations = await this.controller.getAllByUser(user);

      return response
        .status(httpStatus.OK)
        .json(conversations);

    } catch (error: unknown) {
        // TODO: handle Error

        return response
          .status(httpStatus.BAD_REQUEST)
          .send('The conversation list cannot be retrieved.');
    }
  }

  /**
   * Gets a conversation with the given id.
   *
   * @param request  The request.
   * @param response The response.
   *
   * @returns The result response.
   */
  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const conversation = await this.controller.get(id);

      return response
        .status(httpStatus.OK)
        .json(conversation); // TODO: handle null when nonexisting.
    } catch (error: unknown) {
      // TODO: handle Error

      return response
        .status(httpStatus.BAD_REQUEST)
        .send('The conversation cannot be retrieved.');
    }
  }
}
