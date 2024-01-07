import { Document, model, Schema, SchemaTypes } from 'mongoose';
import { UserDocument } from './user.model';

/**
 * FIXME: DRY
 */
export enum MessageStatus {
  SENT = 'sent',
  RECEIVED = 'received'
}

export interface MessageDocument extends Document {
  'sender': UserDocument;
  'receiver': UserDocument;
  'payload': string;
  'status': string;
  'timestamp': number;
}

const messageSchema = new Schema<MessageDocument>({
  'sender': {
    'type': SchemaTypes.ObjectId,
    'ref': 'User',
    'required': true
  },
  'receiver': {
    'type': SchemaTypes.ObjectId,
    'ref': 'User',
    'required': true
  },
  'payload': {
    'type': String,
    'required': true
  },
  'status': {
    'type': String,
    'enum': [ MessageStatus.RECEIVED, MessageStatus.SENT ],
    'required': true
  }},
  {
  'timestamps': true
});

export default model<MessageDocument>('Message', messageSchema);
