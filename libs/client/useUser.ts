import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      //push() => 뒤로가기 기록남음 but replace() => 기록남지 않음
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
