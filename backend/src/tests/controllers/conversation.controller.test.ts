import Conversation from '../../models/conversation.model';
import User, { UserDocument } from '../../models/user.model';
import Message from '../../models/message.model';

import { ConversationController, MessageConversationRequest, UserConversationRequest } from '../../controllers/conversation.controller';

jest.mock('../../models/conversation.model');
jest.mock('../../models/user.model');
jest.mock('../../models/message.model');

describe('conversation-controller', () => {
  const ConversationMocked = jest.mocked(Conversation);
  const UserMocked = jest.mocked(User);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new conversation', async () => {
    const controller = new ConversationController();
    const fakeUsers: UserConversationRequest[] = [{
        'email': 'test@test.com',
        'username': 'usertest1'
      }
    ];

    const fakeMessages: MessageConversationRequest[] = [{
        'sender': fakeUsers[0],
        'receiver': fakeUsers[0],
        'payload': 'test payload'
      }
    ];

    UserMocked.findOne.mockResolvedValue(fakeUsers[0]);
    Message.create = jest.fn()
    Conversation.create = jest.fn().mockImplementation(() => Promise.resolve());

    await expect(controller.create(fakeUsers, fakeMessages)).resolves.toStrictEqual(undefined);
    expect(Message.create).toHaveBeenCalled();
  });

  it('should return a conversation collection from a given user', async () => {
    expect(true).toStrictEqual(false);
  });

  it('should return a empty list from a given user when it does not have', async () => {
    expect(true).toStrictEqual(false);
  });

  it('should throw an error when trying to create a conversation without users', async () => {
    const controller = new ConversationController();
    const fakeUsers: UserConversationRequest[] = [];
    const fakeMessages: MessageConversationRequest[] = [{
        'sender': fakeUsers[0],
        'receiver': fakeUsers[0],
        'payload': 'test payload'
      }
    ];

    UserMocked.findOne.mockResolvedValue(fakeUsers[0]);
    Message.create = jest.fn()
    Conversation.create = jest.fn().mockImplementation(() => Promise.resolve());

    await expect(controller.create(fakeUsers, fakeMessages)).rejects.toBeInstanceOf(Error);
  });

  it('should throw an error when trying to create a conversation without messages', async () => {
    const controller = new ConversationController();
    const fakeMessages: MessageConversationRequest[] = [];
    const fakeUsers: UserConversationRequest[] = [{
        'email': 'test@test.com',
        'username': 'usertest1'
      }
    ];

    UserMocked.findOne.mockResolvedValue(fakeUsers[0]);
    Message.create = jest.fn()
    Conversation.create = jest.fn().mockImplementation(() => Promise.resolve());

    await expect(controller.create(fakeUsers, fakeMessages)).rejects.toBeInstanceOf(Error);
  });
});
