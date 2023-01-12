import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import { FC } from "react";
import { sc } from "../../../common/helpers";
import { EnhancedReactDataGridProps } from "./type";

const EnhancedReactDataGrid: FC<EnhancedReactDataGridProps> = (props) => {
  return (
    <div className={sc()}>
      <ReactDataGrid {...props} />
    </div>
  );
};

export default EnhancedReactDataGrid;
