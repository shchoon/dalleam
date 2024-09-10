import { formatDateTime } from '@/utils/gathering';

describe('formateDateTime', () => {
  it('포맷팅된 날짜와 시간을 반환', () => {
    const result = formatDateTime('2024-09-09T21:00:00.888Z');

    expect(result).not.toBeNull();
    if (result) {
      const { formattedDate, formattedTime } = result;
      expect(formattedDate).toBe('9월 9일');
      expect(formattedTime).toBe('21:00');
    }
  });

  it('유효하지 않은 ISO 8601 형태면 null을 반환.', () => {
    const result = formatDateTime('invalid-date-string');

    expect(result).toBeNull();
  });
});
