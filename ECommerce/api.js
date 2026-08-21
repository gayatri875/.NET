const API_BASE_URL = "http://localhost:5037";

export async function apiRequest(
  endpoint,
  options = {}
) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const contentType =
    response.headers.get("content-type");

  let data = null;

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed: ${response.status}`
    );
  }

  return data;
}