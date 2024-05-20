export const parseToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const getToken = () => {
  const payload = localStorage.getItem('ssoID');

  if (payload === null) {
    return null;
  }

  try {
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
};

export const tokenIsValid = () => {
  const payload = localStorage.getItem('ssoID');

  if (payload === null) {
    return false;
  }

  const token = parseToken(payload);

  if (token === null) {
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  return token.exp >= currentTimestamp;
};

export const getProfile = () => {
  const payload = localStorage.getItem('ssoID');

  if (payload === null) {
    return null;
  }

  const token = parseToken(payload);

  if (token === null) {
    return null;
  }

  return token.sub;
};

// timestamp to dd-mm-yyyy / hh:mm
export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const pad = (value: number) => value.toString().padStart(2, '0');

  const formattedDate = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
  const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return `${formattedDate} / ${formattedTime}`;
};
