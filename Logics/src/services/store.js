import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { DiceService } from "./DiceService";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
};

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    gameState: gameStates.MENU,
    playerCoins: 100, // Initialize player coins

    startGame: () => {
      set({ gameState: gameStates.GAME });
    },
    gameOver: () => {
      set({ gameState: gameStates.GAME_OVER });
    },
    goToMenu: () => {
      set({ gameState: gameStates.MENU });
    },
    updatePlayerCoins: (newAmount) => set({ playerCoins: newAmount }),
  }))
);
