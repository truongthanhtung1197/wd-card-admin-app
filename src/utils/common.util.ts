import { toast } from "@/app/_components/common/Toaster";
import { SERVICE_TYPE } from "@/constant/service.constant";
import { USER_ROLES } from "@/constant/User.constant";
import { User } from "@/model";

import { isValidSize } from "./form.util";

import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { isNilOrEmpty, isNotNilOrEmpty } from "ramda-adjunct";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function insertIf(condition: any, trueValue: any, falseValue?: any) {
  if (!!condition) {
    return trueValue;
  } else {
    if (trueValue instanceof Array) {
      return falseValue || [];
    } else if (typeof trueValue === "object" && trueValue !== null) {
      return falseValue || {};
    } else {
      return falseValue;
    }
  }
}

export function formatDomain(url: string) {
  if (!url) return url;

  try {
    // Thêm protocol tạm nếu thiếu, để URL constructor không báo lỗi
    const hasProtocol = /^https?:\/\//i.test(url);
    const parsed = new URL(hasProtocol ? url : `http://${url}`);
    return parsed.hostname;
  } catch {
    // fallback: xóa thủ công http/https và dấu /
    return url.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  }
}

export const insertObjectIf = (
  condition: boolean | any,
  elements1: any,
  elements2?: any,
) => {
  return condition ? elements1 : (elements2 ?? {});
};
export const insertObjectIfV2 = <T1 extends {}>(
  condition: boolean | any,
  elements1: T1,
): Partial<T1> => {
  return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(
  condition: boolean,
  elements1: T1,
  elements2: T2,
): Partial<T1 | T2> => {
  return condition ? elements1 : elements2;
};

export const getFullName = (user: any) => {
  return [user?.firstName, user?.lastName].filter((item) => !!item).join(" ");
};

export const getRole = (user: any) => {
  if (user?.roles?.includes(USER_ROLES.SUPER_ADMIN)) {
    return "Super Admin";
  }

  return "";
};

export const getLast7DaysRange = (): { startDate: string; endDate: string } => {
  const endDate = moment().endOf("day").toISOString();
  const startDate = moment().subtract(7, "days").startOf("day").toISOString();

  return { startDate, endDate };
};
export const checkObjectValues = (
  obj: { [key: string]: boolean },
  targetLength?: number,
): boolean => {
  if (isNilOrEmpty(obj)) return false;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === false) {
      return false;
    }
  }
  if (targetLength) {
    if (Object.keys(obj)?.length !== targetLength) return false;
  }
  return true;
};

export const createObjectFromArray = (
  arr: any[],
): { [key: number]: boolean } => {
  const result: { [key: number]: boolean } = {};
  for (let i = 0; i < arr.length; i++) {
    result[i] = true;
  }
  return result;
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(
        (reader.result as string).replace("data:", "").replace(/^.+,/, ""),
      );
    reader.onerror = (error) => reject(error);
  });

export const parseSafe = (jsonString: string, defaultValue = {}) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return defaultValue;
  }
};

export const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied to clipboard");
    })
    .catch((err) => {
      toast.error("Failed to copy");
    });
};

export const formatNoteContent = (noteContent: string) => {
  if (!noteContent) return "";

  return noteContent.toString().replace(/\n/g, "<br />");
};

export const randomId = (delta = 0): string => uuidv4() + delta;

export const formatPhoneNumberWithCountryCode = (phoneNumber: string) => {
  let cleaned = phoneNumber?.replace(/\D/g, "");

  if (cleaned?.length > 10) {
    const countryCode = cleaned.slice(0, cleaned.length - 10);
    const part1 = cleaned.slice(-10, -7);
    const part2 = cleaned.slice(-7, -4);
    const part3 = cleaned.slice(-4);
    return `+${countryCode} (${part1}) ${part2}-${part3}`;
  } else if (cleaned?.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (cleaned?.length === 7) {
    return cleaned.replace(/(\d{3})(\d{4})/, "$1 $2");
  }

  return cleaned;
};

export const convertToSlug = (title?: string) => {
  if (!title) return "";
  let slug;
  slug = title?.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    "",
  );
  slug = slug.replace(/ /gi, "-");
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  slug = `@${slug}@`;
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
};

export function checkIncludesUrl(url: string, keywords: string[]) {
  // Split the URL into segments based on the '/' delimiter
  const urlSegments = url.split("/");

  // Check if all keywords are present in the URL segments
  return isNotNilOrEmpty(
    keywords.find((keyword: string) => urlSegments.includes(keyword)),
  );
}

export const validateImageFile = (
  file: File,
  callback: (file: File) => void,
) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (file && !validTypes.includes(file.type)) {
    toast.error("Định dạng file không hợp lệ. Chỉ cho phép JPG, JPEG và PNG");
  }

  if (!isValidSize(file, 2)) {
    toast.error("File giới hạn 2MB");
    return;
  }
  if (file) {
    callback?.(file);
  }
};

export const getAllNestedKeys = (obj: Record<string, any>): string[] => {
  const keys: string[] = [];

  const extractKeys = (currentObj: Record<string, any>) => {
    Object.entries(currentObj).forEach(([key, value]) => {
      keys.push(key);
      if (value && typeof value === "object") {
        extractKeys(value);
      }
    });
  };

  extractKeys(obj);
  return keys;
};

export function apiResponseHandle({
  res,
  onSuccess,
  onFailer,
  toastSuccessMessage,
  toastErrorMessage = "",
}: {
  res: any;
  onFailer?: () => void;
  onSuccess?: () => void;
  toastSuccessMessage?: string;
  toastErrorMessage?: string;
}) {
  if (res.error) {
    toast.error(res.error?.data?.message || toastErrorMessage);
    onFailer?.();
    return;
  }
  if (res?.data) {
    toastSuccessMessage && toast.success(toastSuccessMessage);
    onSuccess?.();
  }
}

export const checkKeyHasOption = (
  key: string,
  options: { key?: string }[],
): boolean => {
  return options.some((option) => option.key === key);
};

export const handleDownloadFromAPIUrl = async (
  filePath: string,
  fileName: string,
) => {
  try {
    const response = await fetch(filePath, { method: "GET" });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "downloaded-file");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export const saveXmlToFile = (xmlDoc: Document) => {
  try {
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);

    const blob = new Blob([xmlString], { type: "application/xml" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "MismoExport.xml";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {}
};

export const getKeyAndLabelServiceType = (serviceType: SERVICE_TYPE) => {
  switch (serviceType) {
    case SERVICE_TYPE.GP:
      return {
        key: "guestPostPrice",
        label: "Guest Post Price",
      };
    case SERVICE_TYPE.TEXTLINK:
      return {
        key: "textLinkPrice",
        label: "Text Link Price",
      };
    case SERVICE_TYPE.BANNER:
      return {
        key: "bannerPrice",
        label: "Banner",
      };
    default:
      return {
        key: "price",
        label: "Price",
      };
  }
};

export const getImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("/")
  ) {
    return imageUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

  if (!baseUrl) return "";

  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = imageUrl.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
};

export const getUserName = (user?: User) => {
  if (!user) return "";

  return user?.displayName || user?.username || "Deleted Account";
};

export const getTextLinkLabels = (service?: {
  isFollowTextLink?: boolean;
  isHomeTextLink?: boolean;
  isFooterTextLink?: boolean;
}): string[] => {
  if (!service) return [];
  const labels: string[] = [];
  if (service.isFollowTextLink) labels.push("follow");
  if (service.isHomeTextLink) labels.push("home");
  if (service.isFooterTextLink) labels.push("footer");
  return labels;
};
