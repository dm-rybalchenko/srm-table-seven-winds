export interface IRow {
  child: IRow[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
}

export interface IResponse {
  current: IRow;
  changed: IRow[];
}

export interface ICells {
  equipmentCosts: number | string;
  estimatedProfit: number | string;
  id: number;
  level?: number;
  overheads: number | string;
  parentId: number | null;
  rowName: string;
  salary: number | string;
  [key: string]: string | number | null | undefined;
}

export interface ITableRowProps {
  children: React.ReactNode;
  cells: ICells;
  edit: (id: number, row: ICells) => void;
  focus: boolean | number;
}

export interface ITableIconsRowProps {
  relation: number;
  level: number;
  parentId: number;
  id: number;
  create: (arg: number | null) => void;
  remove: (arg: number) => void;
}

export type TChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ITableCellProps {
  edit: boolean;
  cell: number | string;
  change: (e: TChangeEvent) => void;
  number: boolean;
}

export type TCallBack = (arr: IRow[], i?: number) => IRow[];
