import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { User } from '../../@types/User';

interface JwtPayload extends DefaultJwtPayload, User {}

export class JwtUtils {
  public static getJwtPayload = (jwtToken: string | any) => {
    return jwtDecode<JwtPayload>(jwtToken);
  };

  public static isTokenValid = (jwtToken: string) => {
    try {
      const payload = JwtUtils.getJwtPayload(jwtToken);
      if (payload === null || payload.exp == null) {
        return false;
      }
      return new Date(payload.exp * 1000) > new Date();
    } catch {
      return false;
    }
  };
}
