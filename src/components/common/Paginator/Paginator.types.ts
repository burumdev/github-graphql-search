
export interface IPaginatorProps {
	currentStep: number;
	totalItems?: number;
	perPage?: number;
	inlineStyles?: Object;
	showSteps?: boolean;
	showNext?: boolean;
	showPrev?: boolean;
	onChangeStep: Function;
}