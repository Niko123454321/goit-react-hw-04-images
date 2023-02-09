import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
export const searchPhoto = async (search, page) => {
  const { data } = await instance.get(
    `?q=${search}&page=${page}&key=31970566-78c0d9aee70a01d48504dc051&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
