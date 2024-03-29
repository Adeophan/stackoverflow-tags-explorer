const API_URL = `https://api.stackexchange.com/2.2/tags`;

export const fetchTags = async (page: number, pageSize: number, order: string, sort: string) => {
  const response = await fetch(`${API_URL}?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};