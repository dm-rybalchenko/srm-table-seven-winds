import { ITableIconsRowProps } from './Table.types';


const CLASS = ['first-level', 'second-level', 'file'];
const LINKS = [
  '../img/table/table-folder-1th-icon.svg',
  '../img/table/table-folder-2th-icon.svg',
  '../img/table/table-file-icon.svg',
  '../img/table/table-bin-icon.svg',
];

export default function TableIconsRow({
  relation,
  level,
  parentId,
  id,
  create,
  remove,
}: ITableIconsRowProps) {
  return (
    <div className={'table__icon ' + CLASS[level - 1]}>
      {level === 1 && (
        <img onClick={() => create(null)} src={LINKS[0]} alt="folder" />
      )}
      {level < 3 && (
        <img
          onClick={level === 2 ? () => create(parentId) : () => create(id)}
          src={LINKS[1]}
          alt="folder"
        />
      )}

      <img
        onClick={
          level === 2
            ? () => create(id)
            : level === 3
            ? () => create(parentId)
            : () => alert('Создайте папку уровня 2')
        }
        src={LINKS[2]}
        alt="file"
      />
      <img
        onClick={() => window.confirm('Удалить строку?') && remove(id)}
        src={LINKS[3]}
        alt="delete"
      />

      {level < 3 && (
        <div
          className="table__icon-relation-down"
          style={{ height: relation > 0 ? relation * 60 - 5 : 0 }}
        ></div>
      )}
      {level > 1 && <div className="table__icon-relation-up"></div>}
    </div>
  );
}
