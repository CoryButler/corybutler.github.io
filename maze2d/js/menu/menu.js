import PlayerButton from "./playerButton.js";
import Menu_MazeSettings from "./menu_mazeSettings.js";
import { isPaused } from "../global.js"

export default function Menu (settings, startGame) {
    const body = document.getElementsByTagName("body")[0];
    const hud = document.createElement("div");
    const menu = document.createElement("div");
    const header = document.createElement("h1");
    const newGame = document.createElement("button");
    const cancel = document.createElement("button");
    const playerSettings = document.createElement("div");
    const settingsButton = document.createElement("button");
    const downloadButton = document.createElement("button");
    const seedNotice = document.createElement("p");

    hud.id = "hud";
    menu.id = "menu";

    header.style = "text-align: center; padding: 0px; width: 100%; background-color: grey; color: white";
    header.innerHTML = "Settings";

    playerSettings.style = "border: 1px solid grey; border-radius: 4px; padding: 16px 0px 0px 8px; float: left; margin-right: 8px";

    newGame.onclick = () => {
        clearStats();
        updateSettings();
        closeMenu();
        startGame();
    }
    newGame.innerHTML = "New Game";

    cancel.style = "float: right";
    cancel.onclick = () => { closeMenu(); }
    cancel.innerHTML = "Cancel";
    cancel.style.display = "none";

    hud.style.display = "none";

    settingsButton.innerHTML = "Settings";
    settingsButton.onclick = () => { openMenu(); }

    downloadButton.innerHTML = "Download Maze";
    downloadButton.onclick = () => { 
        let a = document.createElement("a");
        a.download = `${settings.seed}_${settings.width}x${settings.height}.png`;
        a.href = document.getElementsByTagName("canvas")[0].toDataURL('image/png');
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    seedNotice.style.fontSize = "0.8em";

    menu.appendChild(header);
    
    let playerButtons = [];
    settings.players.forEach(player => { playerButtons.push(new PlayerButton(player, playerSettings)); });

    menu.appendChild(playerSettings);
    let mazeSettings = new Menu_MazeSettings(menu, settings);
    menu.appendChild(document.createElement("br"));
    menu.appendChild(document.createElement("br"));
    menu.appendChild(newGame);
    menu.appendChild(cancel);
    if (document.getElementsByTagName("canvas").length > 0) menu.appendChild(cancel);
    hud.appendChild(downloadButton);
    hud.appendChild(document.createElement("br"));
    hud.appendChild(settingsButton);
    hud.appendChild(document.createElement("br"));
    hud.appendChild(seedNotice);
    body.appendChild(hud);
    body.appendChild(menu);

    const openMenu = () => {
        isPaused(true);
        cancel.style.display = "unset";
        menu.style.display = "unset";
        hud.style.display = "none";

        let c = document.getElementsByTagName("canvas");
        for (let i = 0; i < c.length; i++) c[i].style.display = "none";

        if (document.getElementById("virtualController"))
            document.getElementById("virtualController").style.display = "none";
    }

    const closeMenu = () =>  {
        isPaused(false);
        seedNotice.innerHTML = `Current ${settings.useSeed ? "" : "Random "}Seed: ${settings.seed}`;
        menu.style.display = "none";
        hud.style.display = "inline-grid";
        
        let c = document.getElementsByTagName("canvas");
        for (let i = 0; i < c.length; i++) c[i].style.display = "unset";

        if (document.getElementById("virtualController"))
            document.getElementById("virtualController").style.display = "unset";
    }

    const updateSettings = () => {
        settings.width = mazeSettings.width();
        settings.height = mazeSettings.height();
        settings.useSeed = mazeSettings.useSeed();
        settings.seed = settings.useSeed ? mazeSettings.seed() : Math.round(Math.random() * 2147483647);
        settings.animate = mazeSettings.animate();
        settings.players = [];
        playerButtons.forEach(pb => {
            settings.players.push(
                {
                    type: pb.type(),
                    color: pb.color(),
                    speed: pb.speed(),
                    isChecked: pb.isChecked()
                }
            );
        });
        mazeSettings.displayRandomSeed(settings.seed);
    }

    const clearStats = () => {
        while (document.getElementsByClassName("stat").length > 0) {
            document.getElementsByClassName("stat")[0].remove();
        }
    }

    /* window.addEventListener("keypress", (e) => {
        if (e.key === "a") {
            clearStats();
            updateSettings();
            closeMenu();
            startGame();
            downloadButton.click();
        }
    }); */
}