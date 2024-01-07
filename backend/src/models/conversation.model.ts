import { Document, model, Schema, SchemaTypes } from 'mongoose';
import { UserDocument } from './user.model';
import { MessageDocument } from './message.model';

export interface ConversationDocument extends Document {
  'users': UserDocument[];
  'messages': MessageDocument[];
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
  }]
});

export default model<ConversationDocument>('Conversation', conversationSchema);
