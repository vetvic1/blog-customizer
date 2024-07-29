import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	isOpen: boolean;
	onClick: OnClick;
}

export const ArrowButton = (props: ArrowButtonProps) => {
	const { isOpen, onClick } = props;

	const containerClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});
	const arrowClassName = clsx(styles.arrow, { [styles.arrow_open]: isOpen });

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerClassName}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClassName} />
		</div>
	);
};
