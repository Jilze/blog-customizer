import { CSSProperties, useState } from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

const App = () => {
	const [currentState, onApply] = useState(defaultArticleState);

	const styleVariables = {
		'--font-family': currentState.fontFamilyOption.value,
		'--font-size': currentState.fontSizeOption.value,
		'--font-color': currentState.fontColor.value,
		'--container-width': currentState.contentWidth.value,
		'--bg-color': currentState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm currentState={currentState} onApply={onApply} />
			<Article />
		</main>
	);
};

export default App;
