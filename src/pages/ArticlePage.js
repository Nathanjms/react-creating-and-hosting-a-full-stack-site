import React from 'react';
import ArticlesList from '../components/ArticlesList';
import articleContent from './article-content';

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    if (!article) return <h1>Article Does Not Exist!</h1>

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
    <React.Fragment>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <h2>Other Articles:</h2>
        <ArticlesList articles={ otherArticles } />
    </React.Fragment>
    );
}

export default ArticlePage;