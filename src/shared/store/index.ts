import { CombineStates } from "@rbxts/reflex";
import { waveSlice } from "./slices/game/wave-slice";
import { playersSlice } from "./slices/players-slice";
import { baseSlice } from "./slices/game/base-slice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	waveSlice: waveSlice,
	baseSlice: baseSlice,
	playersSlice: playersSlice,
};
