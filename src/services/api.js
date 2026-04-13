const BASE_URL = 'https://the-one-api.dev/v2';
const API_KEY = import.meta.env.VITE_THE_ONE_API_KEY;

if (!API_KEY) {
  throw new Error('Missing VITE_THE_ONE_API_KEY. Add it to your .env file.');
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

const handleFetch = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("API ERROR:", response.status, text);
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchMovies = (query = "") => {
  const path = query ? `/movie?${query}` : '/movie';
  return handleFetch(path);
};

export const fetchSingleMovie = (id) => {
  return handleFetch(`/movie/${id}`);
};

export const fetchCharacters = (query = "") => {
  const path = query ? `/character?${query}` : '/character';
  return handleFetch(path);
};

export const fetchQuotes = (query = "") => {
  const path = query ? `/quote?${query}` : '/quote';
  return handleFetch(path);
};

export const fetchBooks = () => {
  return handleFetch('/book');
};

export const fetchBookById = (id) => {
  return handleFetch(`/book/${id}`);
};

export const fetchBookChapters = (bookId) => {
  return handleFetch(`/book/${bookId}/chapter`);
};

export const fetchAllChapters = (query = "") => {
  const path = query ? `/chapter?${query}` : '/chapter';
  return handleFetch(path);
};
