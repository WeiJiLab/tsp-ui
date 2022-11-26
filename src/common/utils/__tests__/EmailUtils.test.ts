import { describe, expect, test } from '@jest/globals';
import { EmailUtils } from '../EmailUtils';

describe('Email Utils Test', () => {
  test('aaa is not email', () => {
    expect(EmailUtils.isEmail('aaa')).toBe(false);
  });

  test('aaa@bbb.com is email', () => {
    expect(EmailUtils.isEmail('aaa@bbb.com')).toBe(true);
  });
});
