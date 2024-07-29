import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

type HandleArticleState = (appState: ArticleStateType) => void;

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	handleArticleState: HandleArticleState;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { articleState, handleArticleState } = props;
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const containerRef = useRef(null);
	const containerClassName = clsx(styles.container, {
		[styles.container_open]: isFormOpen,
	});

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: containerRef,
		onChange: setIsFormOpen,
	});

	const handleUpdateState = (propertyName: string) => (value: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [propertyName]: value }));
	};

	const handleArrowClick = (): void => {
		setIsFormOpen((prevState) => !prevState);
	};

	const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		handleArticleState(formState);
		handleArrowClick();
	};

	const handleFormReset = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		handleArticleState(defaultArticleState);
		setFormState(defaultArticleState);
		handleArrowClick();
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowClick} />
			<aside className={containerClassName} ref={containerRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleUpdateState('fontFamilyOption')}
						title='шрифт'
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleUpdateState('fontSizeOption')}
						title='размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleUpdateState('fontColor')}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleUpdateState('backgroundColor')}
						title='цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleUpdateState('contentWidth')}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
