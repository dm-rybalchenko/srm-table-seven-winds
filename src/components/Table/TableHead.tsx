export const HEAD_TITLES = [
  "Уровень",
  "Наименование работ",
  "Основная з/п",
  "Оборудование",
  "Накладные расходы",
  "Сметная прибыль",
];

export default function TableHead() {
	
  return (
    <tr className="table__row">
      {HEAD_TITLES.map((title) => (
        <td key={title} className="table__head">
          {title}
        </td>
      ))}
    </tr>
  );
}
