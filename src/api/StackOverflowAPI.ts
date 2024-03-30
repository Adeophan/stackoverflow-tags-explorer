// StackOverflowAPI.js
const API_URL = "https://api.stackexchange.com/2.3/tags";

export const fetchTagsAndTotal = async (
  page: number,
  pageSize: number,
  order: string = "desc",
  sort: string = "popular",
) => {
  // Fetching tags
  const itemsResponse = await fetch(
    `${API_URL}?order=${order}&sort=${sort}&site=stackoverflow&page=${page}&pagesize=${pageSize}`,
  );
  if (!itemsResponse.ok) {
    throw new Error("Network response was not ok (items)");
  }
  const itemsData = await itemsResponse.json();

  // Fetching total count
  const totalResponse = await fetch(
    `${API_URL}?order=${order}&sort=${sort}&site=stackoverflow&pagesize=0&filter=total`,
  );
  if (!totalResponse.ok) {
    throw new Error("Network response was not ok (total)");
  }
  const totalData = await totalResponse.json();

  return { items: itemsData.items, total: totalData.total };
};
