import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Avatar, Col, Image, List, Row } from 'antd';

import EntityServices from '../../services/entity';
import DashboardHeader from '../common/dashboard-header';
import { EntityRecordDisplayContainer, EntityRecordHeaderContainer, EntityRecordValuesContainer, FieldNameContainer, FieldValueContainer } from './container';
import { EntityContext } from '../../context/entity.context';
import { IFeild } from '../Entity/form';
import { DATA_TYPES } from '../../constants/entiy';
import { error } from '../common/message';

interface props {}

export interface IDataType {
  index: number;
  id: number;
  record: any;
}

const RecordView: React.FC<props> = (props) => {
  const [entityRecordata, setEntityRecordata] = useState([]);

  const { state: entityState } = useContext(EntityContext);

  const { entityName, recordId } = useParams();

  const { selectEntity: currentEntity } = entityState;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetctData();
  };

  const fetctData = async () => {
    try {
      if (entityName && recordId) {
        const res = await EntityServices.getEntityByName(entityName);

        const record = res.entity.filter((rec: any) => {
          console.log(rec.id, recordId);
          try {
            return rec.id === parseInt(recordId);
          } catch (err) {
            error('ERROR');
            return [];
          }
        });
        setEntityRecordata(record[0]);

        return record;
      }
    } catch (err: any) {
      console.log(err);
      error('Error');
    }
  };

  return (
    <EntityRecordDisplayContainer>
      <DashboardHeader title={`${entityState.selectEntity.name} Record`} />
      <EntityRecordHeaderContainer >
        <div className="left">Feild Name</div>
        <div className="right">Values</div>
      </EntityRecordHeaderContainer>
      {Object.entries(currentEntity.fields).map((field: [any, IFeild]) => {
        const [fieldCode, fieldData] = field;
        const { name } = fieldData;
        const DisplayData = () => {
          const data: any = entityRecordata[fieldCode];
          if (fieldData.dataType === DATA_TYPES.IMAGE && !!data && data.length > 0) {
            return (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any) => {
                  const splittedName = item.split('/');
                  const fileName = splittedName[splittedName.length - 1];
                  return (
                    <>
                      <List.Item>
                        <Image width={300} height={150} alt={fileName} src={item} />
                      </List.Item>
                    </>
                  );
                }}
              />
            );
          } else if (fieldData.dataType === DATA_TYPES.DOCUMENT && !!data && data.length > 0) {
            return (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any) => {
                  const splittedName = item.split('/');
                  const fileName = splittedName[splittedName.length - 1];
                  return (
                    <>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="/images/icons/doc.png" />}
                          title={
                            <a href={item} download target="_blank" rel="noreferrer">
                              {fileName}
                            </a>
                          }
                        />
                      </List.Item>
                    </>
                  );
                }}
              />
            );
          } else {
            return <>{entityRecordata[fieldCode]}</>;
          }
        };
        return (
          <EntityRecordValuesContainer>
            <FieldNameContainer>{name}</FieldNameContainer>
            <FieldValueContainer>
              <DisplayData />
            </FieldValueContainer>
          </EntityRecordValuesContainer>
        );
      })}
    </EntityRecordDisplayContainer>
  );
};

export default RecordView;
