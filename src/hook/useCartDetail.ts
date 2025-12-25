import { useMemo } from "react";

import { useGetCartDetailsQuery } from "@/store/Apis/Seoer.api";

export const useCartDetail = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  const { data, refetch, isFetching } = useGetCartDetailsQuery({
    page: Number(page),
    limit: Number(limit),
  });

  const totalCart = useMemo(() => {
    if (data?.total) {
      return data?.total >= 100 ? "99+" : data?.total;
    }
    return 0;
  }, [data?.total]);

  return {
    data,
    totalCartStr: totalCart,
    refetch,
    isFetching,
  };
};
