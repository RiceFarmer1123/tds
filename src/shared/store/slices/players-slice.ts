import { createProducer } from "@rbxts/reflex";
import { mapProperty } from "shared/utils/object-utils";
import { DEFAULT_CASH } from "types/constants/game-configs";

export interface InitialPlayerData {
	ID: number,
	Cash: number;
	UnitsPlaced: Array<string>;
}

export const INITIAL_PLAYER_DATA: InitialPlayerData = {
	ID: 0,
	Cash: 0,
	UnitsPlaced: [],
};

interface PlayerState {
	readonly [player: number]: InitialPlayerData | undefined;
}

const initialState: PlayerState = {};
export const playersSlice = createProducer(initialState, {
	loadPlayerData: (state, id: number, data?: Partial<InitialPlayerData>) => {
		return {
			...state,
			[id]: {
				...INITIAL_PLAYER_DATA,
				ID: id,
				...data,
			},
		};
	},

	closePlayerData: (state, id: string) => {
		return {
			...state,
			[id]: undefined,
		};
	},

	setPlayerCash: (state, id: number, Cash: number) => {
		return mapProperty(state, id, (player) => ({
			...player,
			Cash,
		}));
	},
});
