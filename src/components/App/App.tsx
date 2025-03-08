import { CSSProperties, useState } from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const styleVariables = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};

export default App;
