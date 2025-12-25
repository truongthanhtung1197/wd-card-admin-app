export const REGEX = {
  PHONE: /^0[123456789][0-9]{8}$/,
  TELEGRAM: /^@[A-Za-z0-9_]{4,}$/,
  INTEGER: /^-?\d+(\.\d+)?$/,
  NO_SPECIAL_CHARACTER: /^[a-zA-Z0-9\s]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  DOMAIN: /^(?=.*\.)[^\s]*$/,
  USERNAME: /^[a-z0-9]+$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
  GOOGLE_DRIVE_URL: /^(https?:\/\/)?(drive\.google\.com\/).*$/, //
};
