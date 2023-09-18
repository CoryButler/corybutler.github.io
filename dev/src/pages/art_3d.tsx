import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PortfolioCard from "../comp/PortfolioCard";
import cory_png from "../img/cory.png";

export default function Art_3D(props: any) {
    return (
        <>
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
        </>
    );
}