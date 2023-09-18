import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PortfolioCard from "../comp/PortfolioCard";
import cory_png from "../img/cory.png";

export default function About(props: any) {
    return (
        <div className="flex-column">
            <div className="flex-row">
                <img className="circle shadow" src={cory_png} />
                <div className="text-area">
                    <h1 className="header">A little bit about me...</h1>
                    <div className="paragraph-container">
                        <p>I am a professional software developer and an art hobbyist.</p>
                        <p>Being highly interested in problem-solving and process-optimization, I love developing software that turns a day's worth of work, such as custom data formatting, into a matter of seconds.</p>
                        <p>It's fun finding ways to use my skills (in regards to software development and otherwise) to improve the lives of others' and to increase their chances to seize their own opportunities.</p>
                    </div>
                </div>
            </div>
            <div className="hr-fade-to-right"></div>
            <h1 className="header">A little bit more...</h1>
                <div className="flex-row">
                <p className="row-header">Programming Languages</p><p>C#, TypeScript/JavaScript</p>
                </div>
                <div className="flex-row">
                <p className="row-header">Frameworks</p><p>.NET, React</p>
                </div>
                <div className="flex-row">
                <p className="row-header">Software</p><p>Visual Studio & Visual Studio Code, Adobe (Photoshop, Premiere, Illustrator), Microsoft (Word, Excel, Outlook)</p>
                </div>
                <div className="flex-row">
                <p className="row-header">Languages</p><p>English (Native), German (Fluent ~B2 Level)</p>
                </div>
                <div className="flex-row">
                <p className="row-header">Hobbies</p><p>Drawing, Language, Bookbinding, Piano, Photography, Hiking</p>
                </div>
                <div className="flex-row">
                <p className="row-header">Mantra</p><p>Every day, take one step toward your goal.</p>
                </div>
            <div className="hr-fade-to-right"></div>
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
        </div>
    );
}