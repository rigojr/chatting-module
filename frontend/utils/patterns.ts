// TODO: add unit test.
type Action<T> = (...args: T[keyof T][]) => void;

export class Observable<T> {
  private listeners: Map<keyof T, Action<T>>;

  constructor () {
    this.listeners = new Map();
  }

  /**
   * Registers a new listener.
   *
   * @param listener The listener.
   */
  public on(event: keyof T, action: Action<T>): void {
    this.listeners.set(event, action);
  }

  /**
   * Removes the given listener.
   *
   * @param listener The listener.
   */
  public remove(event: keyof T): void {
    this.listeners.delete(event);
  }

  /**
   * Removes all subscribed listeners.
   */
  public removeAll(): void {
    this.listeners.clear();
  }

  /**
   * Emits an event to notify listeners.
   *
   * @param event The event.
   */
  public emit<K extends keyof T>(event: K, ...args: T[K][]): void { // FIXME: this type checking is not working properly.
    const action = this.listeners.get(event);

    if (!isNullish(action)) {
      action(...args);
    }
  }
}

export class Singleton { // TODO: maybe later with factory
  private static instance: Singleton;

  private constructor () {
    // Nothing here.
  }

  public static get(): Singleton {
    if (isNullish(Singleton.instance)) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}
