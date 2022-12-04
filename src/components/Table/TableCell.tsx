import { ITableCellProps } from './Table.types';


export default function TableCell({
  edit,
  cell,
  change,
  number,
}: ITableCellProps) {

  const formatNumber = (cell: number) => {
	
    return new Intl.NumberFormat('ru-RU').format(cell);
  };

  return (
    <td className="table__cell">
      {edit ? (
        <input onChange={change} type="text" value={cell} />
      ) : number ? (
        formatNumber(cell as number)
      ) : (
        cell
      )}
    </td>
  );
}
