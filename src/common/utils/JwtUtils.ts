import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export class JwtUtils {
  public static getJwtPayload = (jwtToken: string) => {
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
