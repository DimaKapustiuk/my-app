import { UPDATE_ACTIVE_CELL_ID, INCREMENT_CELL_VALUE, DECREMENT_CELL_VALUE } from "../types";

export const IncrementCellValueAction = ({ cellId }: {cellId: number}) => {
  return {
    type: INCREMENT_CELL_VALUE,
    cellId
  }
};

export const DecrementCellValueAction = ({ cellId }: { cellId: number }) => {
  return {
    type: DECREMENT_CELL_VALUE,
    cellId
  }
};

export const UpdateActiveCellIdAction = ({ activeCellId }: { activeCellId: number }) => {
  return {
    type: UPDATE_ACTIVE_CELL_ID,
    activeCellId
  }
};

export const PressKeyAction = ({ type }: { type: string }) => {
  return {
    type
  }
};