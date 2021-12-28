
export interface IntVerticalListProps {
	list: Object[];
	idKey?: string;
	leftKey?: string;
	rightKey?: string;
	renderRight?: React.ReactNode;
	title?: string;
	loading?: boolean;
	onClickItem?: Function,
}