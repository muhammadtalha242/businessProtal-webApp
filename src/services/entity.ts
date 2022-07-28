import axios from "../singletons/axios";
import REACT_APP_API_URL from "../constants/api";

const getEntities = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/entity`);
  return res.data;
};

const exports = {
  getEntities,
};

export default exports;
