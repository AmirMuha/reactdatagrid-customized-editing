import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import ReactDataGridProps from "@inovua/reactdatagrid-enterprise/types";

namespace EnhancedReactDataGridType {
  export type Classes = Partial<{
    container: string;
  }>;
}

export type EnhancedReactDataGridProps = {
  classes?: EnhancedReactDataGridType.Classes;
} & Partial<typeof ReactDataGrid["defaultProps"]> &
  Pick<ReactDataGridProps.TypeDataGridProps, "columns" | "dataSource"> &
  Partial<Omit<ReactDataGridProps.TypeDataGridProps, "columns" | "dataSource">>;
