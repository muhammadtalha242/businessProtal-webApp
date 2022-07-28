import axios from "axios";

import REACT_BASE_URL from "../constants/api";

const instance = axios.create({
  baseURL: REACT_BASE_URL,
});

export default instance;
