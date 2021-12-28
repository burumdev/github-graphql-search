
import React from 'react';

//styles
import s from './Paginator.module.css';

//comps
import Button from '../Button/Button';

//types
import { IPaginatorProps } from './Paginator.types';

const Paginator: React.FC<IPaginatorProps> = ({
	currentStep,
	totalItems = Number.MAX_SAFE_INTEGER,
	perPage = 1,
	showSteps = true,
	showNext = true,
	showPrev = true,
	inlineStyles = {},
	//Getting functions in props to avoid scope confusion
	...props
}) => {
	const totalSteps = Math.ceil(totalItems / perPage);

	const renderSteps = () => {
		const stepItems: React.ReactNode[] = [];
		for (let i = 1; i <= totalSteps; i++) {
			stepItems.push(
				<Button
					key={`button-pag-${i}`}
					buttonInner={i}
					onClick={() => props.onChangeStep(i)}
					isTransparentBox
					isHalfOpacity={currentStep !== i}
				/>
			)
		}
		return stepItems;
	}

	return (
		<div className={s.Paginator} style={inlineStyles}>
			<Button
				buttonInner='< Prev'
				onClick={() => props.onChangeStep(currentStep - 1)}
				isTransparentBox
				isHidden={currentStep === 1 || !showPrev}
			/>
			{showSteps && renderSteps()}
			<Button
				buttonInner='Next >'
				onClick={() => props.onChangeStep(currentStep + 1)}
				isTransparentBox
				isHidden={currentStep === totalSteps || !showNext}
			/>
		</div>
	)
}

export default Paginator;
