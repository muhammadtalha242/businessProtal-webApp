import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Avatar, Col, Image, List, Row } from 'antd';

import EntityServices from '../../services/entity';
import DashboardHeader from '../common/dashboard-header';
import { EntityRecordDisplayContainer, EntityRecordHeaderContainer, EntityRecordValuesContainer, FieldLabelContainer, FieldNameContainer, FieldValueContainer } from './container';
import { EntityContext } from '../../context/entity.context';
import { IFeild } from '../Entity/form';
import { DATA_TYPES } from '../../constants/entiy';
import { error } from '../common/message';
import GoogleMaps from '../common/google-maps';

interface props {}

export interface IDataType {
  index: number;
  id: number;
  record: any;
}

const PublicIcon: React.FC<{ isPublic: boolean }> = ({ isPublic }) => {
  return <>{isPublic && <img src={`/images/icons/public_icon.svg`} width={20} height={20} alt="public" />}</>;
};

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
            console.log('err: ', err);

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
      <EntityRecordHeaderContainer>
        <div className="left">Feild Name</div>
        <div className="right">Values</div>
      </EntityRecordHeaderContainer>
      {Object.entries(currentEntity.fields).map((field: [any, IFeild]) => {
        const [fieldCode, fieldData] = field;
        const { name } = fieldData;
        const DisplayData = () => {
          console.log("fieldCode, fieldData", fieldCode, fieldData);
          
          const data: any = entityRecordata[fieldCode];
          console.log('data: ', data);

          if (fieldData.dataType === DATA_TYPES.LOCATION && !!data) {
            
            return <GoogleMaps value={data} isEditable={false}/>;
          } else if (fieldData.dataType === DATA_TYPES.IMAGE && !!data && data.length > 0) {
            return (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any) => {
                  return (
                    <>
                      <List.Item>
                        <Image width={300} height={150} alt={item.fileName} src={item.url} />
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
                  return (
                    <>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="/images/icons/doc.png" />}
                          title={
                            <a href={item.url} download target="_blank" rel="noreferrer">
                              {item.fileName}
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
            <FieldNameContainer>
              <FieldLabelContainer>
                <div className="title">{name}</div>
                <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
              </FieldLabelContainer>
            </FieldNameContainer>
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
