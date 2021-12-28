
import React, { useState } from "react";

//types
import { IntSearchProps } from "./Search.types";

//comps
import Input from '../Input/Input';
import Button from '../Button/Button';

//styles
import s from './Search.module.css';

const Search: React.FC<IntSearchProps> = ({
	initialSearchTerm,
	loading = false,
	//Getting functions in props
	...props
}) => {
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

	const onChangeSearchTerm = (searchTerm: string) => {
		setSearchTerm(searchTerm);
	}

	return (
		<div className={s.Search}>
			<Input
				value={searchTerm}
				isFullHeight
				inlineStyles={{
					flexGrow: 2,
					marginRight: '1rem'
				}}
				placeholder="Search Users"
				onChangeValue={onChangeSearchTerm}
			/>
			<Button
				buttonInner='Search'
				isFullHeight
				loading={loading}
				inlineStyles={{
					width: '12rem',
				}}
				onClick={() => props.onClickSearch(searchTerm)}
			/>
		</div>
	)
}

export default Search;
