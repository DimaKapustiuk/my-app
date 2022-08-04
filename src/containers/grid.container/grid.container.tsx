import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GridComponent from "../../components/grid/grid.component";
import { KeyPressEnum } from "../../enums/key-press.enum";
import { useKeyboardPress } from "../../hooks/keyboard-press.hook";
import {
  DecrementCellValueAction,
  IncrementCellValueAction,
  PressKeyAction,
} from "../../redux/actions/grid.actions";
import {
  SelectActiveCellId,
  SelectColumns,
  SelectGridReducerRows,
} from "../../redux/selectors/grid.selector";
import "./grid.container.scss";

const GridContainer = () => {
  const [rowsColumnTotals, setRowColumnTotals] = useState([]);
  const rows = SelectGridReducerRows();
  const columns = SelectColumns();
  const activeCellId = SelectActiveCellId();
  const keyPressProps = useKeyboardPress();
  const dispatch = useDispatch();

  useEffect(() => {
    const { type, keyCode } = keyPressProps;

    if (keyCode === KeyPressEnum.SPACE || keyCode === KeyPressEnum.NUMPAD_ADD) {
      dispatch(IncrementCellValueAction({ cellId: activeCellId }));
      return;
    }

    if (keyCode === KeyPressEnum.NUMPAD_SUBTRACT) {
      dispatch(DecrementCellValueAction({ cellId: activeCellId }));
      return;
    }

    if (keyCode !== KeyPressEnum.SPACE) {
      dispatch(PressKeyAction({ type }));
      return;
    }
  }, [keyPressProps, dispatch]);

  useEffect(() => {
    const columnTotals = rows.reduce((acc: any[], row: any) => {
      const rowColumns = columns.filter(
        ({ rowId }: { rowId: Number }) => rowId === row.id
      );

      if (!acc.length) {
        acc = rowColumns.map(({ value }: { value: number }) => ({ value }));
        return acc;
      }

      acc = acc.map(({ value }, i) => ({
        key: new Date().toDateString() + i,
        value: rowColumns[i].value + value,
      }));

      return acc;
    }, []);

    setRowColumnTotals(columnTotals);
  }, [columns, rows]);

  return (
    <div className="grid-container">
      <div className="grid-container__description">
        <h2>Please update the value in cell</h2>
        <div className="grid-container__description-navigate">
          <span>
            Use keyboard for navigate the cell: ArrowUP, ArrowDown, ArrowLeft,
            ArrowRight
          </span>
          <span>For increment: SPACE or Numbad +</span>
          <span>For decriment: Numbad -</span>
        </div>
      </div>
      <div className="grid-container__grid">
        {
          <GridComponent
            rows={rows}
            rowsColumnTotals={rowsColumnTotals}
            activeCellId={activeCellId}
          />
        }
      </div>
    </div>
  );
};

export default GridContainer;
