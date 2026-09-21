export function validateSlug(value) {
  // 英小文字・数字・ハイフンのみを許可
  const regex = /^[a-z0-9-]+$/;
  const isValid = regex.test(value);
  // 3文字から50文字まで
  const isValidLength = value.length >= 3 && value.length <= 50;

  return isValid && isValidLength;
}
