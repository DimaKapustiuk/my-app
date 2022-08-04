import "./total-cell.component.scss";

const GridRowCellTotalComponent = ({ value }: { value: number }): any => {
  return <div className="grid-cell-total">{value}</div>;
};

export default GridRowCellTotalComponent;
