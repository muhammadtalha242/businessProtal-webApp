import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useLocation } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { Link } from 'react-router-dom';

import TableDraggable from '../common/table-dragable';
import EntityServices from '../../services/entity';
import DashboardHeader from '../common/dashboard-header';
import { FilledButton } from '../common/button';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import { EntityRecordDisplayContainer } from './container';
import Form from './form';
import FilterCollapes from './filter-collapse';
import { IFilter } from './filters';
import { sortData, transformData } from '../../utils/filters';
import { UserContext } from '../../context/user.context';
import { EntityContext } from '../../context/entity.context';
import { IEntity, IFeild } from '../Entity/form';

interface props {}

export interface IDataType {
  index: number;
  id: number;
  record: any;
}

type DataIndex = keyof IDataType;

const Records: React.FC<props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [entityData, setEntityData] = useState([]);
  const [columnData, setColumnData] = useState<ColumnsType<IDataType>>();
  const [tableData, setTableData] = useState<IDataType[]>();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [recordSelected, setRecordSelected] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterData, setFilterData] = useState<IFilter>();

  const { state: userState } = useContext(UserContext);
  const { state: entityState } = useContext(EntityContext);

  const { entityName } = useParams();

  const { selectEntity: currentEntity } = entityState;

  useEffect(() => {
    getData();
  }, [showForm]);

  useEffect(() => {
    if (filterData && filterData.filterValues.length > 0) {
      updateData();
      getTableColumns();
    } else {
      getData();
    }
  }, [filterData]);

  const updateData = async () => {
    let response;
    if (filterData) {
      if (filterData.filterValues.length > 0) {
        response = transformData(entityData, filterData.filterValues);
      }
      if (filterData.sortValues.length > 0) {
        response = response || entityData;
        response = sortData(response, filterData.sortValues);
      }
      await getTableData(response);
    }
  };

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

  const getColumnSearchProps = (dataIndex: DataIndex, columnName: string): ColumnType<IDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${columnName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (record[dataIndex]) {
        const dataType = currentEntity.fields[dataIndex].dataType;

        if (dataType === 'Number') {
          if (record[dataIndex] > value) {
            return record[dataIndex];
          }
        } else
          return record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase());
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 1);
      }
    },
    render: (text) => {
      return searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
      ) : (
        text
      );
    },
    sorter: {
      compare: (record_1, record_2) => {
        const res = record_1[dataIndex] - record_2[dataIndex] ? record_1[dataIndex] - record_2[dataIndex] : ('' + record_1[dataIndex]).localeCompare(record_2[dataIndex]);
        return res;
      },
      multiple: 1,
    },
  });

  const getTableColumns = () => {
    const columns: ColumnsType<IDataType> = Object.entries(currentEntity.fields).map((field: [any, IFeild], index: number) => {
      const fieldCode = field[0];
      const fieldData = field[1];

      return {
        title: ` ${fieldData.name}`,
        dataIndex: fieldCode,
        key: fieldCode,
        ...getColumnSearchProps(fieldCode, fieldData.name),
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
            <div onClick={onEdit(record)}>Edit</div>
            <div onClick={onDelete(record)}>Delete</div>
          </Space>
        ),
      },
    ]);
  };
  const getTableData = async (response: any) => {
    const rowData: IDataType[] = response.map((value: any, index: number) => {
      // Object.entries(currentEntity.fields).forEach((field: [string, IFeild]) => {
      //   const [fieldCode, fieldData] = field;
      //   const { settings: fieldSettings } = fieldData;
      //   if (fieldSettings.prefix && value[fieldCode]) {
      //     value[fieldCode] = `${fieldSettings.prefix} ${value[fieldCode]}`;
      //   }
      // });

      return { index: index + 1, ...value };
    });
    setTableData([...rowData]);
  };

  const onSave = async (entityRecords: any) => {
    try {
      if (isEdit && entityName) {
        const { index, ...restVal } = entityRecords;
        const datesAdd = { ...restVal, updatedAt: moment().toDate() };
        await EntityServices.updateEntityRecord(entityName, entityRecords.id, datesAdd);
        getData();
      } else if (entityName) {
        const datesAdd = { ...entityRecords, createdAt: moment().toDate(), updatedAt: moment().toDate() };
        await EntityServices.addEntityRecord(entityName, datesAdd);
        getData();
      }
    } catch (error: any) {}
  };

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const onEdit = (record: any) => () => {
    setShowForm(true);
    setIsEdit(true);
    setRecordSelected({ ...record });
  };

  const onDelete = (record: any) => async () => {
    try {
      if (entityName) {
        await EntityServices.deleteEntityRecord(entityName, record.id);
        getData();
      }
    } catch (error: any) {}
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getFilterData = (filter: IFilter) => {
    setFilterData(filter);
    updateData();
    getTableColumns();
  };

  return (
    <EntityRecordDisplayContainer>
      <DashboardHeader title={entityState.selectEntity.name}>
        {entityState.selectEntity &&
          [...entityState.selectEntity.entityPermissionsCreate, ...entityState.selectEntity.entityPermissionsDelete].some((ele: number) => userState.userGroupCodes?.includes(ele)) && (
            <FilledButton width="144px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={() => setShowForm(!showForm)}>
              <img src="/images/icons/add.svg" alt="add" /> Add Record
            </FilledButton>
          )}
      </DashboardHeader>
      {showForm && <Form setShowForm={setShowForm} onSave={onSave} formData={entityState.selectEntity.fields} recordSelected={recordSelected} isEdit={isEdit} setIsEdit={setIsEdit} />}
      <FilterCollapes entityFields={entityState.selectEntity.fields} getFilterData={getFilterData} />
      {tableData && columnData && <TableDraggable data={tableData} columns={columnData} rowSelection={rowSelection} scroll={{ x: '100vw' }}/>}
    </EntityRecordDisplayContainer>
  );
};

export default Records;
