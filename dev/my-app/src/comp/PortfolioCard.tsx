import React from 'react';
import ReactDOM from 'react-dom';

export default function PortfolioCard(props: any) {
    const paragraphs = props.paragraphs.map((p: string, i: number) => {
        return <p key={i}>{p}</p>;
    });
    return (
        <div className="portfolio-card">
            <div className="image-area">
                <h1>{props.img_header}</h1>
                <img className="image-area" src={props.img} />
            </div>
            <div className="text-area">
                <h1>{props.header}</h1>
                <div className="paragraph-container">
                    {paragraphs}
                </div>
            </div>
        </div>
    );
}