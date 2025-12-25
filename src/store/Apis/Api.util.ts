export function covertObjectToSearchParams(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item: any) => {
          params.append(key, item);
        });
      } else {
        params.append(key, value);
      }
    }
  });

  return params.toString();
}

type FilterCondition = {
  condition: string;
  value?: string | number | boolean;
};

type FilterObject = {
  [key: string]: FilterCondition;
};

export function convertToFilterString(filters: FilterObject): string {
  return Object.entries(filters)
    .filter(
      ([_, { value }]) => value !== undefined && value !== null && value !== "",
    )
    .map(
      ([field, { condition, value }]) =>
        `filter=${field}||${condition}||${value}`,
    )
    .join("&");
}
