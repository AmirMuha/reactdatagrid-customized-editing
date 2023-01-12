/// <reference types="react" />
import * as react from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import ReactDataGridProps from '@inovua/reactdatagrid-enterprise/types';

declare namespace EnhancedReactDataGridType {
    type Classes = Partial<{
        container: string;
    }>;
}
declare type EnhancedReactDataGridProps = {
    classes?: EnhancedReactDataGridType.Classes;
} & Partial<typeof ReactDataGrid["defaultProps"]> & Pick<ReactDataGridProps.TypeDataGridProps, "columns" | "dataSource"> & Partial<Omit<ReactDataGridProps.TypeDataGridProps, "columns" | "dataSource">>;

declare const EnhancedReactDataGrid: react.FC<Omit<EnhancedReactDataGridProps, "columns" | "dataSource">>;

export { EnhancedReactDataGrid as default };
