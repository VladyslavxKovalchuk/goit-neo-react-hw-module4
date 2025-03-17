import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common.Authorization = `Client-ID ${
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY
}`;
axios.defaults.params = {
  "Accept-Version": "v1",
  per_page: 12,
};

export const fetchPhotos = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
    },
  });
  return response.data;
};
