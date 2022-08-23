import axios from '../singletons/axios';
import REACT_APP_API_URL from '../constants/api';
import { IEditEntity, IEntity } from '../components/Entity/form';

const getEntities = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/entity`);
  return res.data;
};

const getEntityByName = async (entityName: string) => {
  const res = await axios.get(`${REACT_APP_API_URL}/entity/${entityName}`);
  return res.data;
};

const createEntities = async (entity: IEntity) => {
  const res = await axios.post(`${REACT_APP_API_URL}/entity`, entity);
  return res.data;
};

const updateEntity = async (entityName: string, updateEntityData: IEditEntity) => {
  const res = await axios.put(`${REACT_APP_API_URL}/entity/${entityName}`, updateEntityData);
  return res.data;
};

const deleteEntity = async (entityId: number) => {
  const res = await axios.delete(`${REACT_APP_API_URL}/entity/${entityId}`);
  return res.data;
};

const addEntityRecord = async (entityName: string, entityRecords: {}) => {
  const res = await axios.post(`${REACT_APP_API_URL}/entity/${entityName}/record`, entityRecords);
  return res.data;
};

const updateEntityRecord = async (entityName: string, entityRecordsId: number, entityRecords: {}) => {
  const res = await axios.put(`${REACT_APP_API_URL}/entity/${entityName}/record/${entityRecordsId}`, entityRecords);
  return res.data;
};

const deleteEntityRecord = async (entityName: string, entityRecordsId: number) => {
  const res = await axios.delete(`${REACT_APP_API_URL}/entity/${entityName}/record/${entityRecordsId}`);
  return res.data;
};

const exports = {
  getEntities,
  getEntityByName,
  createEntities,
  deleteEntity,
  updateEntity,
  addEntityRecord,
  updateEntityRecord,
  deleteEntityRecord,
};

export default exports;
