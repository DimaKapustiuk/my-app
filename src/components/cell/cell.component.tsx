import { useDispatch } from "react-redux";
import {
  UpdateActiveCellIdAction,
  IncrementCellValueAction,
} from "../../redux/actions/grid.actions";
import "./cell.component.scss";

const GridRowCellComponent = ({
  id,
  value,
  rowId,
  activeCellId,
}: {
  id: any;
  value: number;
  rowId: any;
  activeCellId: number;
}): any => {
  const dispatch = useDispatch();

  const updateCount = () => {
    dispatch(
      IncrementCellValueAction({
        cellId: id,
      })
    );
    dispatch(UpdateActiveCellIdAction({ activeCellId: id }));
  };

  return (
    <div
      className={
        activeCellId === id ? "grid-cell grid-cell_active" : "grid-cell"
      }
      id={id}
      onClick={updateCount}
    >
      {value}
    </div>
  );
};

export default GridRowCellComponent;
