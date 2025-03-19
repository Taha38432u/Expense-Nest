import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions.js";

export default function useTransactions(email) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["transactions", email],
    queryFn: ({ pageParam = 1 }) => getTransactions({ email, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? null,
    enabled: !!email,
  });

  // Flatten all pages into a single transactions array
  const transactions = data?.pages?.flatMap((page) => page.transactions) || [];

  // Extract totalCount from ANY page (it's the same for all pages)
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;

  return {
    transactions,
    totalCount, // Correctly expose total count from Supabase
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
