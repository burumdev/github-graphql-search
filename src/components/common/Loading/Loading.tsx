
import React from 'react';
import cn from "classnames/bind";

//types
import { IntLoadingProps } from "./Loading.types";

//styles
import s from './Loading.module.css';

const Loading: React.FC<IntLoadingProps> = ({
	size = 'normal'
}) => {
	//classnames
	const cx = cn.bind(s);
	const loadingClasses = cx(s.Loading, {
		[s.LoadingHuge]: size === 'huge',
		[s.LoadingBig]: size === 'big',
		[s.LoadingNormal]: size === 'normal',
		[s.LoadingSmall]: size === 'small',
		[s.LoadingTiny]: size === 'tiny',
	})

	return <img className={loadingClasses} src="img/loading.svg" alt="Loading" />
}

export default Loading;
