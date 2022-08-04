import { PRESS_ARROW_DOWN, PRESS_ARROW_LEFT, PRESS_ARROW_RIGHT, PRESS_ARROW_UP, INCREMENT_CELL_VALUE, DECREMENT_CELL_VALUE } from "../types";

const intialState = {
  rows: [
    {id: 1},
    {id: 2},
    {id: 3}
  ],
  rowColumns: [
    { id: 1, value: 1, rowId: 1 }, { id: 2, value: 2, rowId: 1 }, { id: 3, value: 3, rowId: 1 }, { id: 4, value: 4, rowId: 1 },
    { id: 5, value: 5, rowId: 2 }, { id: 6, value: 6, rowId: 2 }, { id: 7, value: 7, rowId: 2 }, { id: 8, value: 8, rowId: 2 },
    { id: 9, value: 9, rowId: 3 }, { id: 10, value: 10, rowId: 3 }, { id: 11, value: 11, rowId: 3 }, { id: 12, value: 12, rowId: 3}
  ],
  activeCellId: 1,
  pressKeyCode: ''
}

export const gridReducer = (state = intialState, action: any) => {
  switch(action.type) {
    case INCREMENT_CELL_VALUE: {
      return {
        ...state,
        rowColumns: state.rowColumns.map(ob => ({
          ...ob,
          value: action.cellId !== ob.id ? ob.value : ob.value + 1
        }))
      }
    }

    case DECREMENT_CELL_VALUE: {
      return {
        ...state,
        rowColumns: state.rowColumns.map(ob => ({
          ...ob,
          value: action.cellId !== ob.id ? ob.value : ob.value - 1
        }))
      }
    }
     

      

      case 'UPDATE_ACTIVE_CELL_ID': {

        return {
          ...state,
          activeCellId: action.activeCellId
        }
      }

      case PRESS_ARROW_RIGHT: {
        const getActiveCellId = ({ activeCellId, rowColumns }: any) => {
          return activeCellId === rowColumns[rowColumns.length - 1].id ? rowColumns[0].id : activeCellId + 1;
        }

        return {
          ...state,
          activeCellId: getActiveCellId(state)
        }
      }

      case PRESS_ARROW_LEFT: {
        const getActiveCellId = ({ activeCellId, rowColumns }: any) => {
          return activeCellId === rowColumns[0].id ? rowColumns[rowColumns.length - 1].id : activeCellId - 1;
        }

        return {
          ...state,
          activeCellId: getActiveCellId(state)
        }
      }

      case PRESS_ARROW_UP: {
        const getActiveCellId = ({ activeCellId, rowColumns, rows }: any) => {
          const activeCellIndex = rowColumns.findIndex(({ id }: { id: number }) => id === activeCellId);
          const nextIndex = activeCellIndex - (rows.length + 1);
      
          if (nextIndex === -(rows.length + 1)) {
            return  rowColumns[rowColumns.length - 1].id;
          }

          if (nextIndex < 0) {
            return  rowColumns[nextIndex + (rowColumns.length - 1)].id;
          }
          
          return rowColumns[nextIndex].id;
        }

        return {
          ...state,
          activeCellId: getActiveCellId(state)
        }
      }

      case PRESS_ARROW_DOWN: {
        const getActiveCellId = ({ activeCellId, rowColumns, rows }: any) => {
          const activeCellIndex = rowColumns.findIndex(({ id }: { id: number }) => id === activeCellId);
          const nextIndex = activeCellIndex + (rows.length + 1);

          if (nextIndex === (rowColumns.length + rows.length)) {
            return  rowColumns[0].id;
          }

          if (nextIndex > rowColumns.length - 1) {
            return  rowColumns[nextIndex - (rowColumns.length - 1)].id;
          }
          
          return rowColumns[nextIndex].id;
        }

        return {
          ...state,
          activeCellId: getActiveCellId(state)
        }
      }

    default:
      return state;
  }
}