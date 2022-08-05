import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

export interface IDataType {
  key: string;
  name: string;
  description: string;
}

export const columns: ColumnsType<IDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  { title: 'description', dataIndex: 'description', key: 'description' },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export const tableData: IDataType[] = [
  {
    key: '1',
    name: 'John Brown',
    description: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    description: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    description: 'Sidney No. 1 Lake Park',
  },
];
