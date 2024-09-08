import { useQuery } from "@tanstack/react-query";

export const useCustomQuery = (queryKey, url) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await fetch(url);
      if (res.status === 500) {
        throw new Error("Internal Server Error");
      }
      return res.json();
    },
  });
};
