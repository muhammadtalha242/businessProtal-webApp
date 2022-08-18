import React from 'react';

// import { EntityItemContainer } from './container';
// import Checkbox from '../common/checkbox';
// import { IEntity, IFeild, IValues } from './form';
// import { Space } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import Table from '../common/table-dragable';

// interface props {
//   entity: IEntity;
//   key: 0;
// }

// export interface IDataType {
//   key: number;
//   value: string;
// }

// const EntityItem: React.FC<props> = (props) => {
//   let tableData: any[] = [];
//   props.entity.fields.forEach((field: IFeild, index: number) => {
//     const x = field.values.map((value: IValues, index: number) => {
//       return { key: index, [field.name]: value.value };
//     });
//     tableData.push(...x);
//   });

//   console.log('tableData: ', tableData);

//   const columns: ColumnsType = props.entity.fields.map((field: IFeild, index: number) => {
//     return {
//       title: field.name,
//       dataIndex: field.name,
//       key: field.name,
//     };
//   });
//   // const columns: ColumnsType<IDataType> = [
//   //   {
//   //     title: 'Name',
//   //     dataIndex: 'name',
//   //     key: 'name',
//   //   },
//   //   {
//   //     title: 'Action',
//   //     key: 'action',
//   //     render: (_, record) => (
//   //       <Space size="middle">
//   //         <div onClick={() => {}}>Edit</div>
//   //         <div onClick={() => {}}>view</div>
//   //         <div onClick={() => {}}>Delete</div>
//   //       </Space>
//   //     ),
//   //   },
//   // ];
//   return <Table data={tableData} columns={columns} />;
// };

// export default EntityItem;
