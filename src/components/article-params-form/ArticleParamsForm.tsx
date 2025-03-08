import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
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
import styles from './ArticleParamsForm.module.scss';

type ArticleFormConfigProps = {
	articleState: ArticleStateType;
	setArticleState: (newState: ArticleStateType) => void;
};

type FormFieldConfig = {
	key: keyof typeof defaultArticleState;
	title: string;
} & (
	| {
			type: 'select';
			options: OptionType[];
	  }
	| {
			type: 'radio';
			options: OptionType[];
			name: string;
	  }
);

const formConfig: FormFieldConfig[] = [
	{
		type: 'select',
		key: 'fontFamilyOption',
		options: fontFamilyOptions,
		title: 'Шрифт',
	},
	{
		type: 'radio',
		key: 'fontSizeOption',
		options: fontSizeOptions,
		title: 'Размер шрифта',
		name: 'fontSize',
	},
	{
		type: 'select',
		key: 'fontColor',
		options: fontColors,
		title: 'Цвет шрифта',
	},
	{
		type: 'select',
		key: 'backgroundColor',
		options: backgroundColors,
		title: 'Цвет фона',
	},
	{
		type: 'select',
		key: 'contentWidth',
		options: contentWidthArr,
		title: 'Ширина контента',
	},
];

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleFormConfigProps) => {
	const formRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState({ ...articleState, ...formState });
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		rootRef: formRef,
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		onChange: () => {},
	});

	const setIsOpenClass = clsx(
		styles.container,
		isMenuOpen && styles.container_open
	);

	return (
		<div ref={formRef}>
			<ArrowButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				isOpen={isMenuOpen}
			/>
			<aside className={setIsOpenClass}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{formConfig.map((config) => {
						const { key, title } = config;
						const commonProps = {
							title,
							selected: formState[key],
							onChange: (value: unknown) =>
								setFormState((prev) => ({ ...prev, [key]: value })),
						};

						if (config.type === 'select') {
							return (
								<Select key={key} {...commonProps} options={config.options} />
							);
						}

						if (config.type === 'radio') {
							return (
								<RadioGroup
									key={key}
									{...commonProps}
									options={config.options}
									name={config.name}
								/>
							);
						}

						return null;
					})}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
