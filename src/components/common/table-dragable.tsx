import { Table } from 'antd';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface props {
  data: any;
  columns: any;
  rowSelection?: any;
}

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return <tr ref={ref} className={`${className}${isOver ? dropClassName : ''}`} style={{ cursor: 'move', ...style }} {...restProps} />;
};

const App: React.FC<props> = ({ columns, data, rowSelection }) => {
  const [tableData, setTableData] = useState<any>();
  const [tableColumns, setTableColumns] = useState();

  useEffect(() => {
    setTableData(data);
    setTableColumns(columns);
  }, [columns, data]);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = tableData[dragIndex];
      setTableData(
        update(tableData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [tableData]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        components={components}
        tableLayout={'auto'}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr as React.HTMLAttributes<any>;
        }}
        pagination={false}
        rowSelection={rowSelection}
      />
    </DndProvider>
  );
};

export default App;
