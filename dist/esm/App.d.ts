import "@inovua/reactdatagrid-enterprise/index.css";
import React from "react";
import { EnhancedReactDataGridProps } from "./components/app/enhanced-reactdatagrid/type";
declare const App: React.FC<Omit<EnhancedReactDataGridProps, "dataSource" | "columns">>;
export default App;
