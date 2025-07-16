import { useEffect, useState } from "react";

export const useFetchData = <T>(url: string): T | undefined => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}`, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          setData(await res.json());
        } else {
          console.log("GET request failed!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return data;
};
