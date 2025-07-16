const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      console.log("GET_DATA_ERROR!");
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.log("GET_DATA_ERROR!", error);
    return [] as T;
  }
};

export default fetchData;
