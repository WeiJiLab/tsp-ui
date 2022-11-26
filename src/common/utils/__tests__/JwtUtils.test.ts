import { describe, expect, test } from '@jest/globals';
import { JwtUtils } from '../JwtUtils';

describe('JwtUtils getJwtPayload() Test', () => {
  test('should return jwt payload when given a jwt', () => {
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjY5Mzc3NTQ3LCJleHAiOjE2NzAyNDE1NDcsImF1dGhvcml0aWVzIjoiUk9MRV9VU0VSIiwiYWNjb3VudF90eXBlIjoiVVNFUiIsInVzZXJuYW1lIjoiemhhbmdzYW4ifQ.yxLin0Ltzj62aua6HDXSm39A1GVMU01Jimo8hBuH2FFHuZLxAogBvc23pQvsaCP_bYxlfRkJxhSKnTYuZUNvKQ';
    const jwtPayload = JwtUtils.getJwtPayload(token);

    const { username } = jwtPayload;

    expect(username).toBe('zhangsan');
  });
});
