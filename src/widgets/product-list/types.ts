export type SelectionChangeType = 'select_all' | 'deselect_all' | 'toggle';

export interface SelectionChangeParams {
    type: SelectionChangeType;
    id?: number;
    checked?: boolean;
}
