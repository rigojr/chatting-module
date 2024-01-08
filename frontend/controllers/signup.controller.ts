import httpStatus from "http-status";

import { Observable } from "~/utils/patterns";
import axiosInstance from "~/services/axios";

export type Events = {
  'signup-started': [];
  'signup-completed': [];
  'signup-unsuccessfully-completed': [string];
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
      const response = await axiosInstance.post('/signup', { ...user });

      if (response.status !== httpStatus.CREATED) {
        const message = 'The user is already register';

        this.emit('signup-unsuccessfully-completed', [ message ]);

        return;
      }

      this.emit('signup-completed');
    } catch (error: unknown) {
      console.log(error);
      // TODO: handle error.
      const message = 'Some error test message';

      this.emit('signup-failed', [ message ]);
    }
  }
}