import { ICells } from './Table.types';


const ID = {
  id: 31176,
  rowName: '15d1dc7e-f6aa-454e-934b-8687202bce4c',
};

const getRows = () => {

  return fetch(
    `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/list`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log('error', error);
    });
};

const createRow = (parentId: number | null) => {

  return fetch(
    `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ ...createNewRow(), parentId: parentId || null }),
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log('error', error);
    });
};

const updateRow = (rowId: number, rowItem: ICells) => {

  return fetch(
    `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/${rowId}/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ ...createNewRow(), ...rowItem }),
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log('error', error);
    });
};

const deleteRow = (rowId: number) => {

  return fetch(
    `http://185.244.172.108:8081/v1/outlay-rows/entity/${ID.id}/row/${rowId}/delete`,
    { method: 'DELETE' }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log('error', error);
    });
};

export const createNewRow = () => {

  return {
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: '',
    salary: 0,
    supportCosts: 0,
  };
};

export { getRows, createRow, updateRow, deleteRow };
