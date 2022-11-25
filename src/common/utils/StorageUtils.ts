import { JsonUtils } from './json-utils';

export class StorageUtils {
  public static get<T = string>(key: string): T | string | null {
    const item = localStorage.getItem(key);
    if (item && JsonUtils.isJson(item)) {
      return JSON.parse(item);
    }
    return item;
  }

  public static set<T = string>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static remove = (key: string) => {
    localStorage.removeItem(key);
  };

  public static clear = () => {
    localStorage.clear();
  };
}
