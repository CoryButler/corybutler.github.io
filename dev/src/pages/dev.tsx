import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PortfolioCard from "../comp/PortfolioCard";
import img_csc from "../img/dev_csc.png";
import img_tapeMeasure from "../img/dev_tapeMeasure.png";
import img_craneCab from "../img/dev_craneCab.png";
import img_wiringSim from "../img/dev_wiringSim.png";
import img_csq from "../img/dev_csq.png";
import img_craneRange from "../img/dev_craneRange.png";
import img_stc from "../img/dev_stc.png";

import img_codeine from "../img/dev_codeine.png";
import img_pigeon from "../img/dev_pigeon.png";
import img_maze from "../img/dev_maze.png";
import img_math from "../img/dev_math.png";
import img_steganography from "../img/dev_steganography.png";
import img_tetris from "../img/dev_tetris.png";
import img_textAdenture from "../img/dev_textAdenture.png";
import img_cyoa from "../img/dev_cyoa.png";
import img_romanNumeral from "../img/dev_romanNumeral.png";
import Footer from "../comp/Footer";

export default function Dev(props: any) {
    return (
        <div className="flex-column">
            <div className="flex-row">
                <div className="text-area">
                    <h1 className="header">Software Development</h1>
                    <div className="paragraph-container">
                        <p>Utilizing C#, TypeScript, and JavaScript, I have worked on several unique professional and personal projects.</p>
                        <p>By clicking "Try it yourself!" next to any project, you can... try it yourself.</p>
                    </div>
                </div>
            </div>
            <div className="hr-fade-to-right"></div>
            <h2 className="header">Professional Projects</h2>
            <PortfolioCard
                header="UA Crane Signalperson Certification"
                href="https://uaolr.org/csc/"
                img={img_csc}
                isImgOnLeft={true}
                paragraphs={["Developed for the United Association (UA), this dual-monitor, examination software is used by UA instructors to both test and certify their students for crane hand signaling.  It features an examinee screen that display a crane motion to the student, who must physically and verbally identify it.  An instructor screen is used to grade the student's performance and navigate the exam."]}
            />
            <PortfolioCard
                header="Using a Tape Measure Activity"
                href="https://www.corybutler.com/tape_measure/"
                img={img_tapeMeasure}
                isImgOnLeft={false}
                paragraphs={["This activity teaches the basic use of a tape measure.  Built using the Phaser 3 framework, it features intuitive mouse controls and a subtle parallax effect for a more immersive experience."]}
            />
            <PortfolioCard
                header="Interactive Crane Cab Identification"
                href="https://www.corybutler.com/crane_cab/"
                img={img_craneCab}
                isImgOnLeft={true}
                paragraphs={["Developed for the Electrical Training Alliance, this is a full-rotatable, 360° component identification exercise.  The user can turn the virtual camera in any direction to locate the requested component."]}
            />
            <PortfolioCard
                header="Transformer Wiring Simulations"
                href="https://atplearningresources.com/clients/FTC/app.html?file=3_120-240_WyeDelta_30"
                img={img_wiringSim}
                isImgOnLeft={false}
                paragraphs={["Developed for the Line Construction Advancement Fund, this study tool/examination software is used to teach students the proper process of wiring transformers in a wide assortment of configurations.  The display is highly scalable, and wires are drawn using simple and intuitive mouse controls."]}
            />
            <PortfolioCard
                header="Crane Hand Signaling Quiz"
                href="https://atplearningresources.com/clients/atp/OLR/"
                img={img_csq}
                isImgOnLeft={true}
                paragraphs={["This self-paced study tool allows users to test and improve their knowledge of crane hand signals.  A crane motion animation is displayed, and the corresponding hand signal must be selected from the sliding list below."]}
            />
            <PortfolioCard
                header="Crane Range Diagram"
                href="https://atplearningresources.com/dev/InteractiveRangeDiagram/"
                img={img_craneRange}
                isImgOnLeft={false}
                paragraphs={["Developed for the Electrical Training Alliance, this is a practice exam that tests users on their knowledge of safe load-lift practices and crane operation theory."]}
            />
            <PortfolioCard
                header="Solar Time Calculator"
                href="https://www.corybutler.com/solar_time_calculator/"
                img={img_stc}
                isImgOnLeft={true}
                paragraphs={["Solar time is based on the position of the Sun relative to a location on Earth.  This calculator takes in a date, location, and time zone, and converts the clock time to solar time and vice versa."]}
            />
            <div className="hr-fade-to-right"></div>
            <h2 className="header">Personal Projects</h2>
            <PortfolioCard
                header="Codeine IDE"
                href="https://www.corybutler.com/codeine_ide/"
                img={img_codeine}
                isImgOnLeft={true}
                paragraphs={["This IDE was developed specifically to write, load, and save programs in Codeine, my own purposefully archaic interpreted language that allows the user to perform simple calculations and even create custom functions."]}
            />
            <PortfolioCard
                header="Catch the Cookies!"
                href="https://www.corybutler.com/pigeon/"
                img={img_pigeon}
                isImgOnLeft={false}
                paragraphs={["I created this game for my kids, based on the work of one of their favorite storybook author, Mo Willems.  Run, jump, and catch the cookies that your selected character loves best.", "This game takes advantage of the Phaser 3 framework."]}
            />
            <PortfolioCard
                header="Maze Generator"
                href="https://www.corybutler.com/maze2d/"
                img={img_maze}
                isImgOnLeft={true}
                paragraphs={["The customization options of this maze generator create an effectively limitless amount of mazes, which can either be played online or printed.  Users can either generate a random maze or use a seed (specific number) to revisit a maze they played previously.", "There is a single-player and two-player mode and 6 different AI opponents, each with its own method of navigating the maze.  Feel free to set each character's color and adjust the speed of the AI opponents.  Stats are displayed as each player/AI finishes.  Plus, just for fun, you can watch the maze draw itself before the game begins."]}
            />
            <PortfolioCard
                header="Math's a Blast!"
                href="https://www.corybutler.com/maths_a_blast/"
                img={img_math}
                isImgOnLeft={false}
                paragraphs={["When my kids need to keep up there math skills in the Summer and didn't want to sit down to fill out handmade, pen-and-paper quizzes, I put together this self-paced, online, math learning tool for them.  It is designed to work on desktops, tablets, and even phones."]}
            />
            <PortfolioCard
                header="Steganographic Message En/decoder"
                href="https://www.corybutler.com/steganography/"
                img={img_steganography}
                isImgOnLeft={true}
                paragraphs={["They say a picture is worth a thousand words.  I say it's worth more!  This program lets you add steganographic messages to images, which you can send to your friends, or ever read the messages hidden in images sent to you."]}
            />
            <PortfolioCard
                header="Tetris... with Style"
                href="https://www.corybutler.com/tetris/"
                img={img_tetris}
                isImgOnLeft={false}
                paragraphs={["It's Tetris in the browser, but you can change the visual style as you play.  Select from \"Default,\" \"Console,\" and \"Mario.\"  The game also features sound effects."]}
            />
            <PortfolioCard
                header="Text Adventure—Game Engine"
                href="https://www.corybutler.com/downloads/Witcher4.zip"
                img={img_textAdenture}
                isDownload={true}
                isImgOnLeft={true}
                paragraphs={["This game engine allows users to create their own text adventure games using XML.  The player can enter commands like \"check,\" \"take,\" \"go,\" and many more to explore and interact with the game world."]}
            />
            <PortfolioCard
                header="Choose Your Own Adventure–Game Engine"
                href="https://www.corybutler.com/downloads/CYOA.zip"
                img={img_cyoa}
                isDownload={true}
                isImgOnLeft={false}
                paragraphs={["This game engine allows users to create their own choose-your-own-adventure games, using specially formatted TXT files to create story elements, prompts, and action menus.  Navigate the menus using the arrow keys.  There is even a bookmark system to pick up the story where you left off."]}
            />
            <PortfolioCard
                header="Roman Numeral Converter"
                href="https://www.corybutler.com/downloads/RomanNumeralConverter.exe"
                img={img_romanNumeral}
                isDownload={true}
                isImgOnLeft={true}
                paragraphs={["This Windows application can convert Roman numerals to Arabic numerals and back again on the fly."]}
            />
            <Footer />
        </div>
    );
}