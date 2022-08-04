import { useSelector, shallowEqual } from "react-redux";

export const SelectGridReducer = () => useSelector((state: any) => state.gridReducer);
export const SelectGridReducerRows = () => useSelector(({ gridReducer }: any) => gridReducer.rows);
export const SelectActiveCellId = () => useSelector(({ gridReducer }: any) => gridReducer.activeCellId);
export const SelectColumns = () => useSelector(({ gridReducer }: any) => gridReducer.rowColumns);
export const SelectRowColumns = (rowId: number) => useSelector(({ gridReducer }: any) => gridReducer.rowColumns.filter(({ rowId: columnRowId }: any) => columnRowId === rowId), shallowEqual);