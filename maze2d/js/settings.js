import { aiTypes, aiSpeeds } from "./global.js";

export default function Settings () {
    return {
        width: 10,
        height: 10,
        animate: true,
        useSeed: false,
        seed: 0,
        players: [
            { type: aiTypes.PLAYER_1, color: "green", controls: "WASD(Q)", isChecked: true },
            { type: aiTypes.PLAYER_2, color: "pink", controls: "🡡🡠🡣🡢(Enter)", isChecked: false },
            { type: aiTypes.RANDOM, color: "red", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.RANDOM_TURNS, color: "orange", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.UNVISITED_TURNS, color: "blue", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.RIGHT_HAND, color: "purple", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.LEFT_HAND, color: "yellow", speed: aiSpeeds.NORMAL, isChecked: false },
            { type: aiTypes.DIJKSTRA, color: "red", speed: aiSpeeds.NORMAL, isChecked: false }
        ]
    }
}