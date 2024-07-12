import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";

export const selectPlayers = (state: SharedState) => state.playersSlice;

export const selectPlayerData = (id: number) => {
	return (state: SharedState) => state.playersSlice[id];
};

export const selectPlayerCash = (id: number) => {
	return (state: SharedState) => state.playersSlice[id]?.Cash as number;
};
