import moment from "moment";
import { isNilOrEmpty } from "ramda-adjunct";

export const formatCurrency = (_value: string | number | undefined) => {
  if (!_value) return "0 đ";

  let value = Number(_value).toString();

  if (isNaN(Number(value))) {
    return value;
  }

  let [integerPart, decimalPart] = value.split(".");

  // Làm tròn nếu có phần thập phân > 2 chữ số
  if (decimalPart && decimalPart.length > 2) {
    value = parseFloat(value).toFixed(2);
    [integerPart, decimalPart] = value.split(".");
  }

  // Thêm dấu phẩy ngăn cách phần nguyên
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${integerPart}.${decimalPart} đ` : `${integerPart} đ`;
};

export const getLabelFromKey = (
  options: { label: string; key: string }[],
  key: string,
) => {
  const foundOption = options.find((option) => option.key === key);
  return foundOption ? foundOption.label : "-";
};

export const formatCurrency2Decimal = (_value: string | number | undefined) => {
  if (!_value) return "0.00";
  let value = _value?.toString();

  if (isNaN(Number(value))) {
    return value;
  }

  value = parseFloat(value).toFixed(2);

  let [integerPart, decimalPart] = value.split(",");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
};

export const formatDateTime = (value?: string | Date, type?: string) => {
  if (!value) return "";

  if (type) {
    return moment.utc(value).local().format(type);
  }

  return moment.utc(value).local().format("DD/MM/YYYY");
};

export const formatTimeHHmmss = (value?: string) => {
  if (!value) return "";

  return moment.utc(value).local().format("HH:mm:ss");
};

export const formatFullTime = (value?: string) => {
  if (!value) return "";

  return moment.utc(value).local().format("DD/MM/YYYY HH:mm:ss");
};

export const formatBudgetToNumber = (value?: string | number): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, ""); // bỏ dấu phẩy
    const number = parseFloat(cleaned); // parse float rồi lấy số
    return Math.floor(number); // bỏ phần thập phân .00
  }
  return 0;
};

export const formatPhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) return "";
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

export const formatPhoneNumberWithPlus = (phone: string) => {
  if (!phone.trim()) {
    return "";
  }
  if (phone.startsWith("+")) {
    return phone;
  }
  return `+${phone}`;
};

export function formatPhoneNumberNoPlus(phoneNumber: string) {
  // Delete "+"
  const cleaned = phoneNumber.replace(/^\+/, "");

  const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const [, areaCode, centralOfficeCode, lineNumber] = match;
    return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  }
  return phoneNumber;
}

export function timeFromNow(createdAt: string): string {
  const now = moment();
  const duration = moment.duration(now.diff(moment(createdAt)));

  if (duration.asMinutes() < 1) {
    return "Just now";
  } else if (duration.asHours() < 1) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asWeeks() < 1) {
    return `${Math.floor(duration.asDays())}d`;
  } else if (duration.asMonths() < 1) {
    return `${Math.floor(duration.asWeeks())}w`;
  } else if (duration.asYears() < 1) {
    return `${Math.floor(duration.asMonths())}mo`;
  } else {
    return `${Math.floor(duration.asYears())}y`;
  }
}

export const joinString = ({
  values = [],
  separator = ", ",
}: {
  values?: (string | undefined | null)[];
  separator?: string;
}): string => {
  if (isNilOrEmpty(values)) {
    return "";
  }
  return values?.filter((i) => !!i)?.join(separator);
};

export const formatAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) => {
  return [address?.street, address?.city, address?.state, address?.zipCode]
    ?.filter((item) => item)
    ?.join(", ");
};

export const formatNumberDecimals = ({
  number,
  decimals = 0,
}: {
  number?: number;
  decimals?: number;
}) => {
  if (!Number(number)) return 0;

  return Number(number).toFixed(decimals);
};

export const formatNumberWithSuffix = (value: number | string): string => {
  if (!value && value !== 0) return "-";

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "-";

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  } else {
    return num.toString();
  }
};

export const formatDateTimeWithLines = (value?: string) => {
  if (!value) return "";

  const time = moment.utc(value).local().format("HH:mm:ss");
  const date = moment.utc(value).local().format("DD/MM/YYYY");

  return { time, date };
};

// Floor rating to nearest 0.5 step
// Examples: 4.9 -> 4.5, 4.2 -> 4.0
export const formatRatingHalfFloor = (value?: number | string) => {
  if (value === undefined || value === null) return "-";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "-";
  const floored = Math.floor(num * 2) / 2;
  // Ensure one decimal when .0 for consistent UI
  return Number.isInteger(floored)
    ? `${floored.toFixed(0)}`
    : `${floored.toFixed(1)}`;
};
