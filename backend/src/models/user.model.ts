import { Document, model, Model, Schema } from "mongoose";
import { hash } from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  profilePicture: Buffer;
};

const userSchema = new Schema<UserDocument>({
  'name': {
    'type': String,
    'required': true,
    'trim': true
  },
  'email': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    'unique': true // TODO: validator should be added here.
  },
  'username': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    'unique': true
  },
  'password': {
    'type': String,
    'required': true, // TODO: a validation should be added.
    'trim': true, // TODO: also minLength, for testing purpose is ignore.
  },
  'profilePicture': {
    'type': Buffer // TODO: validation need to be added.
  }
});

userSchema.pre('save', async function(next): Promise<void> { // TODO: not sure if this is the best approach.
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }

  next();
});

export default model<UserDocument>('User', userSchema);
