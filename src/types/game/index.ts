export enum GameCurrentState { 
    Backlog = "backlog",
    Playing = "playing",
    Completed = "completed"
}

export enum GamePlatforms { 
    NES = "NES",
    SNES = "SNES",
    MEGA_DRIVE = "Mega Drive",
    GAMEBOY = "Gameboy",
    PS1 = "PS1",
    NINTENDO_64 = "N64"
}

export interface Game { 
    id: string,
    title: string,
    platform: GamePlatforms,
    genre: string[],
    status: GameCurrentState,
}

export type CreateGameDTO = Omit<Game, "id">;

