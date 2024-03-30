const API_URL = "https://api.stackexchange.com/2.3/tags";

export const fetchTags = async (
  page: number,
  pageSize: number,
  order: string,
  sort: string,
) => {
  const response = await fetch(
    `${API_URL}?order=${order}&sort=${sort}&site=stackoverflow&page=${page}&pagesize=${pageSize}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.items; // Ensure you return the items array
};
