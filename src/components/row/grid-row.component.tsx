import { useEffect, useState } from "react";
import { SelectRowColumns } from "../../redux/selectors/grid.selector";
import GridCellComponent from "../cell/cell.component";
import GridRowCellTotalComponent from "../total-cell/total-cell.component";
import "./grid-row.component.scss";

const GridRowComponent = ({
  id: rowId,
  activeCellId,
}: {
  id: any;
  activeCellId: number;
}) => {
  const rowColumns: any[] = SelectRowColumns(rowId);
  const [rowSum, setRowSum] = useState(0);

  useEffect(() => {
    setRowSum(rowColumns.reduce((acc, ob) => (acc += ob.value), 0));
  }, [rowColumns]);

  return (
    <div className="grid-row" id={rowId}>
      {rowColumns.map(({ id, value }) => (
        <GridCellComponent
          activeCellId={activeCellId}
          key={id}
          rowId={rowId}
          id={id}
          value={value}
        />
      ))}

      <GridRowCellTotalComponent value={rowSum} />
    </div>
  );
};

export default GridRowComponent;
