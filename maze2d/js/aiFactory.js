function AiFactory (maze) {
    const _maze = maze;

    this.FromAiType = function (aiType) {
        switch (aiType) {
            case aiTypes.RANDOM_TURNS:
                return new Ai_RandomTurns(_maze);
        }
    }
}