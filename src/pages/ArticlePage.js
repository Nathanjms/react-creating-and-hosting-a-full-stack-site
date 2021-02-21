import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
import articleContent from './article-content';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import NotFoundPage from './NotFoundPage';

const ArticlePage = ({ match }) => {

    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <React.Fragment>
            <h1>{article.title}</h1>
            <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments} />
            <h2>Other Articles:</h2>
            <ArticlesList articles={otherArticles} />
        </React.Fragment>
    );
}

export default ArticlePage;