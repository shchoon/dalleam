/**
 * 날짜 및 시간을 포맷팅합니다.
 *
 * @param {string} dateTime - 변환할 문자열 데이터 (ISO 8601 형식의 날짜와 시간 문자열)
 * @returns {{formattedDate: string, formattedTime: string} | null} - 포맷팅된 날짜와 시간을 포함하는 객체 또는 유효하지 않은 경우 null
 * - `formattedDate`: 포맷팅된 날짜 (예: '9월 9일')
 * - `formattedTime`: 포맷팅된 시간 (예: '11:28')
 *
 * 함수가 유효한 ISO 8601 형식의 문자열이 아닌 경우 null을 반환합니다.
 */

export const formatDateTime = (
  dateTime: string,
): { formattedDate: string; formattedTime: string } | null => {
  const date = new Date(dateTime);

  if (isNaN(date.getTime())) return null;

  // UTC 표기 사용
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  const formattedDate = `${month}월 ${day}일`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
};

/**
 *  마감 날짜가 현재 날짜를 지났는지 확인합니다.
 * @param {string} registrationEnd - 비교할 문자열 데이터 (ISO 8601 형식의 날짜와 시간 문자열)
 * @returns {boolean} - 현재 날짜를 지났다면 true, 그렇지 않다면 false.
 *
 * // 현재 날짜가 2024-09-24인 경우
 * isDeadlinePassed('2024-09-23T23:59:59Z'); // true
 * isDeadlinePassed('2024-09-25T00:00:00Z'); // false
 */

export const isDeadlinePassed = (registrationEnd: string): boolean | null => {
  if (isNaN(new Date(registrationEnd).getTime())) return null;

  const now = new Date();
  const targetDate = new Date(registrationEnd);

  return targetDate.getTime() < now.getTime();
};
