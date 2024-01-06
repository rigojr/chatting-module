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

/**
 * The log in form data.
 */
export type LogInFormData = {
  email: string;
  password: string;
}
