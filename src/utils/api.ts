import axios from 'axios';

const api = (url: string, authorization: string) => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Basic ${authorization}`
    }
  });
}

export default api;