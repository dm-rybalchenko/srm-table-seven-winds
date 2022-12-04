import { useEffect, useState } from 'react';

import { ICells, IResponse, IRow, TCallBack } from './Table.types';
import { getRows, createRow, updateRow, deleteRow } from './Table.service';
import TableRow from './TableRow';
import TableIconsRow from './TableIconsRow';
import TableHead from './TableHead';


function Table() {
  const [rows, setRows] = useState<IRow[]>([]);
  const [focusRow, setFocusRow] = useState<boolean | number>(false);

  const addRow = (id: number | null) => {
    const newState = recItem(id, (arr: IRow[], i?: number): IRow[] => {

      createRow(id).then((res: IResponse) => {
        res.current.child = [];

        id ? arr[i as number].child.push(res.current) : arr.push(res.current);

        setFocusRow(res.current.id);

        res.changed.length &&
          res.changed.forEach((item) => updateTable(item.id, item));
      });

      return arr;
    });

    setRows(newState);
  };

  const editRow = (id: number, row: ICells) => {
    updateRow(id, row).then((res: IResponse) => {

      updateTable(res.current.id, res.current);
      setFocusRow(false);

      res.changed.length &&
        res.changed.forEach((item) => updateTable(item.id, item));
    });
  };

  const updateTable = (id: number, row: IRow) => {
    const newState = recItem(id, (arr: IRow[], i?: number): IRow[] => {

      arr[i as number] = {
        ...arr[i as number],
        ...row,
      };

      return arr;
    });

    setRows(newState);
  };

  const removeRow = (id: number) => {
    const newState = recItem(id, (arr: IRow[], i?: number): IRow[] => {

      arr.splice(i as number, 1);

      return arr;
    });

    setRows(newState);
    deleteRow(id).then((res: IResponse) => {

      res.changed.length &&
        res.changed.forEach((item) => updateTable(item.id, item));
    });
  };

  function recItem(
    id: number | null,
    callback: TCallBack,
    arr: IRow[] = rows
  ): IRow[] {
    let newState = [...arr];

    if (id === null) {
      return (newState = callback(newState));
    }

    for (let i = 0; i < newState.length; i++) {

      if (newState[i].id === id) {
        newState = callback(newState, i);

      } else if (newState[i].child.length) {
        newState[i].child = recItem(id, callback, newState[i].child);
      }
    }

    return newState;
  }

  let levelCounter = 1;
  const prepareRow = (obj: IRow, id: number) => {

    return {
      parentId: id,
      level: levelCounter,
      id: obj.id,
      rowName: obj.rowName,
      salary: obj.salary,
      equipmentCosts: obj.equipmentCosts,
      overheads: obj.overheads,
      estimatedProfit: obj.estimatedProfit,
    };
  };

  const prepareTable = (tableArr: IRow[], id?: number): ICells[] => {
    const tableData = [];

    for (let row of tableArr) {
      tableData.push(prepareRow(row, id as number));

      if (row.child.length) {

        levelCounter += 1;
        tableData.push(...prepareTable(row.child, row.id));
        levelCounter -= 1;
      }
    }

    return tableData;
  };

  const countChildren = (row: ICells, index: number, arr: ICells[]): number => {
    const cutArrStart = arr.slice(index + 1);
    const indexEnd = cutArrStart.findIndex((item) => item.level === row.level);
    let cutArrEnd;

    if (indexEnd === -1) {
      cutArrEnd = cutArrStart;
    } else {
      cutArrEnd = cutArrStart.slice(0, indexEnd);
    }

    return (
      cutArrEnd.findLastIndex((item) =>
        row.level === 1 ? item.level === 2 : item.level === 3
      ) + 1
    );
  };

  useEffect(() => {
    getRows().then((data: IRow[]) => {
      setRows(data);
    });
  }, []);

  return (
    <table className="table">
      <tbody>
        <>
          <TableHead />
          {rows.length ? (
            prepareTable(rows).map((row, index, arr) => {

              return (
                <TableRow
                  focus={focusRow}
                  edit={editRow}
                  cells={row}
                  key={row.id}
                >
                  <TableIconsRow
                    parentId={row.parentId as number}
                    id={row.id}
                    create={addRow}
                    remove={removeRow}
                    relation={countChildren(row, index, arr)}
                    level={row.level as number}
                  />
                </TableRow>
              );
            })
          ) : (
            <tr className="table__start">
              <td>
                <button onClick={() => addRow(null)}>Начать работу</button>
              </td>
            </tr>
          )}
        </>
      </tbody>
    </table>
  );
}

export { Table };
