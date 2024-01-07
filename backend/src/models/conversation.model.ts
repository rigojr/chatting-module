import { Document, model, Schema, SchemaTypes } from 'mongoose';
import { UserDocument } from './user.model';
import { MessageDocument } from './message.model';

/**
 * FIXME: DRY
 */
export enum ConversationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}
export interface ConversationDocument extends Document {
  'users': UserDocument[];
  'messages': MessageDocument[];
  'status': ConversationStatus
}

const conversationSchema = new Schema<ConversationDocument>({
  'users': [{
    'type': SchemaTypes.ObjectId,
    'ref': 'User',
    'required': true
  }],
  'messages': [{
    'type': SchemaTypes.ObjectId,
    'ref': 'Message',
    'required': true
  }],
  'status': {
    'type': String,
    'enum': [ ConversationStatus.PENDING, ConversationStatus.ACCEPTED, ConversationStatus.REJECTED ]
  }
});

export default model<ConversationDocument>('Conversation', conversationSchema);
