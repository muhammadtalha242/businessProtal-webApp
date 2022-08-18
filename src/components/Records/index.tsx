import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';

import Table from '../common/table-dragable';
import EntityServices from '../../services/entity';
import DashboardHeader from '../common/dashboard-header';
import { FilledButton } from '../common/button';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import { EntityRecordDisplayContainer } from './container';
import Form from './form';
import { Space } from 'antd';
import { Link } from 'react-router-dom';

interface props {}

export interface IDataType {
  index: number;
  id: number;
  record: any;
}

const Records: React.FC<props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [entityData, setEntityData] = useState([]);
  const [columnData, setColumnData] = useState<ColumnsType<IDataType>>();
  const [tableData, setTableData] = useState<IDataType[]>();

  const { entityName } = useParams();
  const { state: routeState } = useLocation();
  console.log('routeState: ', routeState);

  
  const { currentEntity }: any = routeState;


  useEffect(() => {
    getData();
  }, [showForm]);

  const getData = async () => {
    const response = await fetctData();
    await getTableData(response);
    getTableColumns();
  };

  const fetctData = async () => {
    try {
      if (entityName) {
        const res = await EntityServices.getEntityByName(entityName);
        setEntityData(res.entity);
        return res.entity;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getTableColumns = () => {
    const columns: ColumnsType<IDataType> = Object.entries(currentEntity.fields).map((field: [string, any], index: number) => {
      const fieldCode = field[0];
      const fieldData = field[1];
      return {
        title: fieldData.name,
        dataIndex: fieldCode,
        key: `${fieldCode}-${index}`,
      };
    });

    setColumnData([
      { title: 'Index', dataIndex: 'index', key: 'index' },
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Link to={`/entity/${entityName}/${record.id}`} state={{ currentEntity, recordId: record.id }}>
              <div onClick={() => console.log(record)}>view</div>
            </Link>
            <div onClick={() => console.log(record)}>Edit</div>
            <div onClick={() => console.log(record)}>Delete</div>
          </Space>
        ),
      },
    ]);
  };
  const getTableData = async (response: any) => {
    const rowData: IDataType[] = response.map((value: any, index: number) => {
      return { index: index + 1, ...value };
    });
    setTableData([...rowData]);
  };

  const onSave = async (entityRecords: {}) => {
    try {
      if (entityName) {
        await EntityServices.addEntityRecord(entityName, entityRecords);
        getData();
      }
    } catch (error: any) {}
  };

  return (
    <EntityRecordDisplayContainer>
      <DashboardHeader title={currentEntity.name}>
        <FilledButton width="144px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(!showForm)}>
          <img src="/images/icons/add.svg" alt="add" /> Add Record
        </FilledButton>
      </DashboardHeader>
      {showForm && <Form setShowForm={setShowForm} onSave={onSave} formData={currentEntity.fields} />}
      {tableData && columnData && <Table data={tableData} columns={columnData} />}
    </EntityRecordDisplayContainer>
  );
};

export default Records;
