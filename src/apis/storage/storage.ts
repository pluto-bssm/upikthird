export class Storage {
  static getItem(key: string) {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch (error) {
      void error;
      return null;
    }
  }

  static setItem(key: string, value: string) {
    if (typeof window === "undefined") {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      void error;
    }
  }

  static removeItem(key: string) {
    if (typeof window === "undefined") {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      void error;
    }
  }
}
