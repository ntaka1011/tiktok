import axios from 'axios';

console.log(process.env.REACT_APP_BASE_URL);
const https = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const respone = await https.get(path, options);
  return respone.data;
};
export default https;

//envoirment

//Local mình code
//test : trước khi mình đưa lên production
// production : user sử dụng
