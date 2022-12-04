import { useState, useEffect } from 'react';

import { ICells, ITableRowProps, TChangeEvent } from './Table.types';
import TableCell from './TableCell';


export default function TableRow({
  children,
  cells,
  edit,
  focus,
}: ITableRowProps) {
  const [row, setRow] = useState(cells);
  const [editing, setEditing] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.detail === 2 && setEditing(true);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newRow = validateRow(row);

      if (newRow) {
        edit(row.id, newRow);
        setEditing(false);
        setRow(newRow);
      }
    }
  };

  const validateRow = (row: ICells) => {
    let newRow: ICells | null = { ...row };
    delete newRow.level;

    for (let key in newRow) {
		
      if (key === 'rowName' || key === 'id') continue;
      const item = newRow[key];

      if (typeof item === 'string' && item.match(/[^\d,. ]/g)) {

        alert('Формат введенных данных в числовых ячейках не соответсвует числу');
        newRow = null;

      } else if (typeof item === 'string') {
        newRow[key] = parseFloat(item.replaceAll(' ', '').replaceAll(',', '.'));
      }
    }

    return newRow;
  };

  useEffect(() => {
    focus === row.id && setEditing(true);
  }, [focus]);

  useEffect(() => {
    setRow(cells);
  }, [cells]);

  return (
    <tr
      id={cells.id.toString()}
      onKeyDown={handleEnter}
      onClick={handleEdit}
      className="table__row"
    >
      <td className={'table__cell' + (editing ? ' block' : '')}>{children}</td>
      <TableCell
        number={false}
        cell={row.rowName}
        edit={editing}
        change={(e: TChangeEvent) =>
          setRow((row) => ({ ...row, rowName: e.target.value }))
        }
      />
      <TableCell
        number={true}
        cell={row.salary}
        edit={editing}
        change={(e: TChangeEvent) =>
          setRow((row) => ({ ...row, salary: e.target.value }))
        }
      />
      <TableCell
        number={true}
        cell={row.equipmentCosts}
        edit={editing}
        change={(e: TChangeEvent) =>
          setRow((row) => ({ ...row, equipmentCosts: e.target.value }))
        }
      />
      <TableCell
        number={true}
        cell={row.overheads}
        edit={editing}
        change={(e: TChangeEvent) =>
          setRow((row) => ({ ...row, overheads: e.target.value }))
        }
      />
      <TableCell
        number={true}
        cell={row.estimatedProfit}
        edit={editing}
        change={(e: TChangeEvent) =>
          setRow((row) => ({ ...row, estimatedProfit: e.target.value }))
        }
      />
    </tr>
  );
}
