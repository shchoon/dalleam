import { isDeadlinePassed } from './gathering';

describe('isDeadlinePassed', () => {
  it('유효하지 않은 ISO 8601 형태면 null을 반환', () => {
    const invalidDeadline = 'invalid-date';
    expect(isDeadlinePassed(invalidDeadline)).toBeNull(); // Invalid Date는 현재 시간보다 과거로 간주
  });

  it('마감 날짜와 시간이 아직 안지났다면 false 반환', () => {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    const isoString = tomorrow.toISOString();
    expect(isDeadlinePassed(isoString)).toBe(false);
  });

  it('마감 날짜와 시간이 지났다면 true 반환', () => {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() - 1);
    const isoString = tomorrow.toISOString();
    expect(isDeadlinePassed(isoString)).toBe(true);
  });
});
