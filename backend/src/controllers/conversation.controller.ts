import Message, { MessageDocument, MessageStatus } from "../models/message.model";
import User, { UserDocument } from "../models/user.model";
import Conversation, { ConversationDocument } from "../models/conversation.model";
import { hasNullish, isEmpty, isNullish } from "../utils/type-checking";

export type UserConversationRequest = {
  'email': string;
  'username': string;
}

export type MessageConversationRequest = {
  'sender': UserConversationRequest;
  'receiver': UserConversationRequest;
  'payload': string;
}

export class ConversationController {
  public async create(usersRequest: UserConversationRequest[], messagesRequest: MessageConversationRequest[]): Promise<void> {
    if (isEmpty(usersRequest) || isEmpty(messagesRequest)) {
      throw new Error('The users or messages given are empty.');
    }

    const users = await Promise.all(usersRequest.map((user) => this.getUser(user)));

    if (hasNullish(users)) {
      throw new Error('One or more users are invalid.');
    }

    const messages = await Promise.all(messagesRequest.map((message) => this.createMessage(message)));

    Conversation.create({ users, messages });
  }

  public async getAll(userRequest: UserConversationRequest): Promise<ConversationDocument[]> {
    const user = await this.getUser(userRequest);

    if(isNullish(user)) {
      throw new Error('The given user is invalid.');
    }

    return Conversation.find({ 'users': { '$in': [user._id ]} })
  }

  /**
   * TODO: Maybe this is no the best place for this.
   */
  private async getUser(user: UserConversationRequest): Promise<UserDocument | null> {
    return await User.findOne({
      '$or': [
        { 'email': user.email },
        { 'username': user.username }
      ]
    });
  }

  /**
   * TODO:
   */
  private async createMessage(message: MessageConversationRequest): Promise<MessageDocument> {
    const sender = await this.getUser(message.sender);
    const receiver = await this.getUser(message.receiver);

    if (isNullish(sender) || isNullish(receiver)) {
      throw new Error('The sender and/or receiver given are invalids');
    }

    return await Message.create({
      'sender': sender,
      'receiver': receiver,
      'payload': message.payload,
      'status': MessageStatus.SENT
    });
  }
}