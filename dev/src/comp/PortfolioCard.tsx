export default function PortfolioCard(props: any) {
    const paragraphs = props.paragraphs.map((p: string, i: number) => {
        return <p key={i}>{p}</p>;
    });
    return (
        <article className="portfolio-card">
            {props.isImgOnLeft && <a href={props.href} target="_blank"><img className="portfolio-card-image" src={props.img} /></a>}
            <div className="portfolio-card-text-area">
                <h3 className="portfolio-card-header">{props.header}</h3>
                <div className="paragraph-container">
                    {paragraphs}
                </div>
                <a className="portfolio-card-link" href={props.href} target="_blank">▶ {props.isDownload ? "Download & t" : "T"}ry it yourself!</a>
            </div>
            {!props.isImgOnLeft && <a href={props.href} target="_blank"><img className="portfolio-card-image" src={props.img} /></a>}
        </article>
    );
}