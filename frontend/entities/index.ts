/**
 * The sign up form data.
 */
export type SingUpFormData = {
  name: string;
  email: string;
  user: string;
  password: string;
  passwordRepeated: string;
  profilePicture?: File;
};