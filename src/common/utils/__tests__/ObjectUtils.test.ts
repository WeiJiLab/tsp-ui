import { describe, expect, test } from '@jest/globals';
import { ObjectUtils } from '../ObjectUtils';

describe('ObjectUtils isEmpty() Test', () => {
  test('should return true when given object is null', () => {
    expect(ObjectUtils.isEmpty(null)).toBe(true);
    expect(ObjectUtils.isEmpty(undefined)).toBe(true);
    expect(ObjectUtils.isEmpty({})).toBe(true);
  });

  test('should return false when given object is exist', () => {
    expect(ObjectUtils.isEmpty(5)).toBe(false);
    expect(ObjectUtils.isEmpty('1234')).toBe(false);
    expect(ObjectUtils.isEmpty({ test: 'Test' })).toBe(false);
  });
});
