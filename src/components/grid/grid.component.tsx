import GridRowComponent from "../row/grid-row.component";
import GridRowCellTotalComponent from "../total-cell/total-cell.component";
import "./grid.component.scss";

const GridComponent = ({ ...props }): any => {
  const { rows, rowsColumnTotals, activeCellId } = props;

  return (
    <div className="grid-component">
      {rows.map(({ id }: { id: any }) => (
        <GridRowComponent key={id} id={id} activeCellId={activeCellId} />
      ))}
      <div className="grid-component-totals-row">
        {rowsColumnTotals.map(
          ({ value, key }: { value: number; key: string }) => (
            <GridRowCellTotalComponent key={key} value={value} />
          )
        )}
      </div>
    </div>
  );
};
export default GridComponent;
