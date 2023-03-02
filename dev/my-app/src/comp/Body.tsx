import PortfolioCard from "./PortfolioCard";
import cory_png from "../img/cory.png";

export default function Body(props: any) {
    return (
        <section className="body">
            <PortfolioCard
            img={cory_png}
            header="A little bit about me..."
            paragraphs={["I am a professional software developer and an art hobbyist. Being highly interested in problem-solving and process-optimization has led me to find success in my career.", "My personal goal is to continually improve my skills (relating to software development or otherwise), while in my profession I seek to use those skills in order to improve lives of others' and to increase their chances to seize their own opportunities."]}
            />
            <div className="under-construction">
                <h1>This site is under construction.</h1>
                <h3>Check out some of my projects below in the meantime.</h3>
                <div>
                <a href="//www.corybutler.com/codeine_ide/">Codeine IDE</a>
                <a href="//www.corybutler.com/maze2d/">Maze 2D</a>
                <a href="//www.corybutler.com/steganography/">Steganography</a>
                <a href="//www.corybutler.com/tetris/">Tetris</a>
                </div>
            </div>
        </section>
    );
}