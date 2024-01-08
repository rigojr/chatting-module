import axiosInstance from "~/services/axios";

export type Events = {
  'login-started': [];
  'login-completed': [];
  'login-failed': [string];
}

export type LogInFormData = {
  email: string;
  password: string;
}

export class LoginController extends Observable<Events> {
  constructor () {
    super();
  }

  public async login(user: LogInFormData): Promise<void> {
    this.emit('login-started');

    try {
      await axiosInstance.post('/login', { ...user });

      this.emit('login-completed');
    } catch (error: unknown) {
      // TODO: handle error.
      // TODO: should expose more information
      const message = 'login error';

      this.emit('login-failed', [message]);
    }
  }
}