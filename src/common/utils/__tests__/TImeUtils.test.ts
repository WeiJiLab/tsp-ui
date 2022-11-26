import { describe, expect, test } from '@jest/globals';
import { TimeUtils } from '../TimeUtils';

import '../../../config/DayJsConfig';
import dayjs from 'dayjs';

describe('Time Utils Test', () => {
  test('should return null when given null', () => {
    expect(TimeUtils.formatDatetime(null)).toBe(null);
  });
  test('should return DataTime when given data is not null', () => {
    expect(TimeUtils.formatDatetime('2022-11-25T20:02:23+08:00')).toBe('2022-11-25 20:02:23');
  });

  test('should return date range when given data not null', () => {
    const lastCurrent = dayjs().subtract(1, 'day').toISOString();
    expect(TimeUtils.dateFromNow(lastCurrent)).toBe('1 天前');
  });
});
