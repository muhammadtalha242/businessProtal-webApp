import axios from '../singletons/axios';
import REACT_APP_API_URL from '../constants/api';
import { IEntity } from '../components/entity/form';

const getEntities = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/entity`);
  return res.data;
};

const createEntities = async (entity: IEntity) => {
  const res = await axios.post(`${REACT_APP_API_URL}/entity`, entity);
  return res.data;
};

const exports = {
  getEntities,
  createEntities,
};

export default exports;
