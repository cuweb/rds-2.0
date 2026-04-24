export const isCookieExpired = (cookieName: string): boolean => {
  if (typeof document === 'undefined') return false;

  const cookie = document.cookie
    .split(';')
    .find((entry) => entry.trim().startsWith(`${cookieName}=`));

  if (!cookie) return true;

  const cookieValue = cookie.split('=')[1];
  const expirationDate = new Date(cookieValue);
  return expirationDate.getTime() <= Date.now();
};

export const setCookie = (cookieName: string, days = 365): void => {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=true; expires=${date.toUTCString()}; path=/`;
};
