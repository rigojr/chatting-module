import axiosInstance from "~/services/axios";

export type Events = {
  'signup-started': [];
  'signup-completed': [];
  'signup-failed': [string];
}

/**
 * The user sign up request entity.
 */
export type UserSingUpRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  profilePicture?: Buffer;
};

export class SignUpController extends Observable<Events> {
  constructor () {
    super();
  }

  public async signUp(user: UserSingUpRequest): Promise<void> {
    this.emit('signup-started');

    try {
      // FIXME: encrypt pass here.
      await axiosInstance.post('/signup', { ...user });

      this.emit('signup-completed');
    } catch (error: unknown) {
      // TODO: handle error.
      // TODO: should handle status error to let user know more info.
      const message = 'It seems the username/email is already in use';

      this.emit('signup-failed', [ message ]);
    }
  }
}