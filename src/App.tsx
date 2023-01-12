/** @jsx jsx */
/** @jsxRuntime classic */
import { css, jsx } from "@emotion/react";
import "@inovua/reactdatagrid-enterprise/index.css";
import React, { useState } from "react";
import {
  TypeCellSelection,
  TypeColumn,
  TypeComputedColumn,
  TypeComputedProps,
  TypeEditInfo,
} from "@inovua/reactdatagrid-enterprise/types";
import SelectEditor from "@inovua/reactdatagrid-enterprise/SelectEditor";
import { EnhancedReactDataGrid } from "./components/app/enhanced-reactdatagrid";
import { EnhancedReactDataGridProps } from "./components/app/enhanced-reactdatagrid/type";

const gridStyle = { minHeight: 400 };
const DEFAULT_ACTIVE_CELL: [number, number] = [0, 0];

let inEdit: boolean;

const countryData = [
  { id: "uk", label: "United Kindom" },
  { id: "usa", label: "United States" },
  { id: "ca", label: "Canada" },
];

const columns: TypeColumn[] = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    minWidth: 100,
    type: "number",
  },
  { name: "name", header: "Name", defaultFlex: 1, minWidth: 100 },
  {
    name: "country",
    header: "Country",
    defaultFlex: 1,
    minWidth: 100,
    editable: true,
    editor: (...props: any[]) => {
      return SelectEditor(props[0]);
    },
    editorProps: {
      idProperty: "id",
      dataSource: countryData,
      collapseOnSelect: true,
      clearIcon: null,
      enableNavigation: true,
      enableListNavigation: true,
      listEmptyText: "هیچ گزینه ای یافت نشد",
    },
  } as any,
  { name: "city", header: "City", defaultFlex: 1, minWidth: 100 },
  { name: "age", header: "Age", minWidth: 100, type: "number" },
];

const people = [
  {
    id: 0,
    firstName: "Bill",
    name: "Bill",
    student: true,
    age: 20,
    city: "Manchester",
    country: "uk",
    email: "bill@manchester.uk",
    birthDate: "1980-11-29T00:00:00Z",
  },
  {
    id: 1,
    firstName: "Mary",
    name: "Mary",
    age: 22,
    student: true,
    city: "New York",
    country: "usa",
    email: "mary.mary@gmail.com",
    birthDate: "1982-11-30T00:00:00Z",
  },
  {
    id: 2,
    firstName: "John",
    name: "John",
    age: 32,
    student: false,
    city: "London",
    country: "uk",
    email: "john@London.com",
    birthDate: "1970-12-01T00:00:00Z",
  },
  {
    id: 3,
    firstName: "Boby",
    name: "Boby",
    age: 32,
    student: false,
    city: "Vancouver",
    country: "ca",
    email: "boby@vancouver.com",
    birthDate: "1987-12-02T00:00:00Z",
  },
  {
    id: 4,
    firstName: "Billy",
    name: "Billy",
    age: 32,
    student: false,
    city: "Edmonton",
    email: "billy@edmonton.ca",
    country: "ca",
    birthDate: "1990-12-03T00:00:00Z",
  },
  {
    id: 5,
    firstName: "Johny",
    name: "Johny",
    age: 32,
    student: true,
    city: "San Jose",
    country: "usa",
    email: "johny@yahoo.com",
    birthDate: "1989-12-04T00:00:00Z",
  },
  {
    id: 6,
    firstName: "Hilly",
    name: "Hilly",
    age: 32,
    student: true,
    city: "London",
    country: "uk",
    email: "hilly@london.co.uk",
    birthDate: "2010-12-05T00:00:00Z",
  },
  {
    id: 7,
    firstName: "Hillaay",
    name: "Hillaay",
    age: 47,
    student: false,
    city: "Bristol",
    country: "uk",
    email: "hillaay@britain.com",
    birthDate: "1987-12-06T00:00:00Z",
  },
  {
    id: 8,
    firstName: "Matthew",
    name: "Matthew",
    age: 47,
    student: false,
    city: "Leeds",
    country: "uk",
    email: "matthew@leeds.co.uk",
    birthDate: "2007-12-07T00:00:00Z",
  },
  {
    id: 9,
    firstName: "David",
    name: "David",
    age: 48,
    student: false,
    city: "Toronto",
    country: "ca",
    email: "david@toronto.com",
    birthDate: "1979-12-08T00:00:00Z",
  },
  {
    id: 10,
    firstName: "Richard",
    name: "Richard",
    age: 9,
    student: false,
    city: "Ottawa",
    country: "ca",
    email: "richard@ottawa.ca",
    birthDate: "2000-12-09T00:00:00Z",
  },
  {
    id: 11,
    firstName: "Hillary",
    name: "Hillary",
    age: 34,
    student: true,
    city: "Los Angeles",
    email: "hillary@gmail.com",
    country: "usa",
    birthDate: "1982-12-10T00:00:00Z",
  },
  {
    id: 12,
    firstName: "Maria",
    name: "Williams",
    age: 32,
    student: true,
    city: "New York",
    email: "maria@gmail.com",
    country: "usa",
    birthDate: "1981-12-11T00:00:00Z",
  },
];

const isSelectEditor = (column: any) => {
  const isEditable = column.computedEditable;

  if (!isEditable) return;
  const isSelectEditorFn =
    !!column.editorProps?.dataSource || !!column.editorProps?.collapseOnSelect;
  return isSelectEditorFn;
};

const RAW_RECORD = {
  rowIndex: 0,
  id: "",
  firstName: "",
  name: "",
  age: "",
  student: "",
  city: "",
  email: "",
  country: "",
  birthDate: "",
};

const App: React.FC<
  Omit<EnhancedReactDataGridProps, "dataSource" | "columns">
> = (props) => {
  const [cellSelection, setCellSelection] = useState<TypeCellSelection>({});
  const [gridRef, setGridRef] = useState<{ current: TypeComputedProps } | null>(
    null
  );
  const [dataSource, setDataSource] = useState([RAW_RECORD]);

  /*
   * -----------------WHAT ARE NEEDED TO BE PASSED ?
   * - DATA
   * - EMPTY RAW ROW
   * - ON EDIT COMPLETE CALLBACK
   * - ON DELETE ROW CALLBACK
   * - ON KEY DOWN CALLBACK
   */

  const onEditStart = () => {
    inEdit = true;
  };

  const onEditStop = () => {
    requestAnimationFrame(() => {
      inEdit = false;
      (gridRef as any).current.focus();
    });
  };

  const onKeyDown = (event: any) => {
    if (inEdit && event.key !== "Enter" && !["Delete"].includes(event.key)) {
      return;
    }
    if (!gridRef?.current) return;
    const grid = gridRef.current;
    const visibleColumns = gridRef.current.visibleColumns;
    if (!grid.computedActiveCell) return;
    let [rowIndex, colIndex] = grid.computedActiveCell;
    const column = grid.getColumnBy(colIndex);
    if ((event.key === " " || event.key === "Enter") && !inEdit) {
      if (grid.startEdit) grid.startEdit({ columnId: column.name!, rowIndex });
      event.preventDefault();
      return;
    } else if (event.key === "Enter" && inEdit) {
      const currentColumnIndex = visibleColumns.findIndex(
        (s) => s.name === column.name
      );
      if (currentColumnIndex !== -1 && gridRef?.current?.startEdit) {
        const nextColumnIndex = currentColumnIndex + 1;
        if (!!visibleColumns && nextColumnIndex === visibleColumns.length) {
          gridRef.current.startEdit({
            columnId: visibleColumns[0].name!,
            rowIndex: rowIndex + 1,
          });
          setTimeout(() => grid.setActiveCell([rowIndex + 1, 0]), 0);
        } else {
          gridRef.current.startEdit({
            columnId: visibleColumns[nextColumnIndex].name!,
            rowIndex,
          });
          setTimeout(() => grid.setActiveCell([rowIndex, nextColumnIndex]), 0);
        }
      }
    } else if (event.key === "Delete" && !inEdit) {
      setDataSource((prev) => {
        prev.splice(rowIndex, 1);
        return prev;
      });
      if (rowIndex !== 0) {
        setTimeout(() => grid.setActiveCell([rowIndex - 1, 0]), 0);
      }
      grid.reload();
    }
    if (event.key !== "Tab") return;
    event.preventDefault();
    event.stopPropagation();
    const direction = event.shiftKey ? -1 : 1;
    const rowCount = grid.count;
    colIndex -= direction;
    if (colIndex === -1) {
      colIndex = visibleColumns.length - 1;
      rowIndex -= 1;
    }
    if (colIndex === columns.length) {
      rowIndex += 1;
      colIndex = 0;
    }
    if (rowIndex < 0 || rowIndex === rowCount) {
      return;
    }
    grid.setActiveCell([rowIndex, colIndex]);
  };

  const onEditComplete = ({ value, columnId, rowIndex }: TypeEditInfo) => {
    if (gridRef) {
      const visibleColumns = gridRef.current.visibleColumns;
      const currentColumnIndex = visibleColumns.findIndex(
        (s) => s.name === columnId
      );
      const nextColumnIndex = currentColumnIndex + 1;
      if (!!visibleColumns && nextColumnIndex === visibleColumns.length) {
        const data = [...dataSource];
        data[rowIndex] = Object.assign({}, data[rowIndex], {
          [columnId]: value,
        });
        data.splice(rowIndex + 1, 0, {
          ...RAW_RECORD,
          rowIndex: dataSource.length,
        });
        setDataSource(data);
      } else {
        const data = [...dataSource];
        data[rowIndex] = Object.assign({}, data[rowIndex], {
          [columnId]: value,
        });
        setDataSource(data);
      }
    }
  };

  const handleNewRow = () => {
    if (!gridRef?.current) return;
    const grid = gridRef.current;
    if (!grid.computedActiveCell) return;
    let [rowIndex, colIndex] = grid.computedActiveCell;
    setDataSource((prev) => {
      prev.splice(rowIndex + 1, 0, {
        ...RAW_RECORD,
        rowIndex: dataSource.length,
      });
      return prev;
    });
    grid.reload();
    setTimeout(() => grid.setActiveCell([rowIndex + 1, colIndex]), 0);
  };

  return (
    <div className="container mx-auto my-10">
      <EnhancedReactDataGrid
        rtl
        handle={setGridRef as any}
        idProperty="rowIndex"
        style={gridStyle}
        enableClipboard
        defaultActiveCell={DEFAULT_ACTIVE_CELL}
        onKeyDown={onKeyDown}
        onEditComplete={onEditComplete}
        onEditStart={onEditStart}
        onEditStop={onEditStop}
        cellSelection={cellSelection}
        onCellSelectionChange={setCellSelection}
        editable={true}
        columns={columns}
        dataSource={dataSource}
        css={css`
          & .InovuaReactDataGrid__body {
            & .InovuaReactDataGrid__cell {
              padding: 0;
            }
          }
        `}
        {...props}
      />
      <button
        onClick={handleNewRow}
        className="p-2 px-4 text-center text-white bg-teal-800"
      >
        NEW ROW
      </button>
    </div>
  );
};

export default App;
