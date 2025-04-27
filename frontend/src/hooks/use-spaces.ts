import { useQuery } from "@tanstack/react-query";
import { fetchSpaces } from "../services/spaces/spacesService"; // Your API function

// 2. Define the hook
export function useSpaces() {
  // Fetch spaces using React Query
  const {
    data: spaces,
    isLoading,
    error,
    refetch,
  } = useQuery<Space[], Error>({
    queryKey: ["spaces"],
    queryFn: fetchSpaces,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Return the result from the query hook
  return { spaces, isLoading, error, refetch };
}
