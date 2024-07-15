import { createProducer } from "@rbxts/reflex";
import { BASE_HEALTH } from "types/constants/game-configs";

interface BaseInterface {
	health: number | undefined;
	max_health: number | undefined;
	completed: boolean;
}

const initialData: BaseInterface = {
	health: BASE_HEALTH,
	max_health: BASE_HEALTH,
	completed: false,
};

const initialState: BaseInterface = {
	health: undefined,
	max_health: undefined,
	completed: false,
};
export const baseSlice = createProducer(initialState, {
	loadBase: (state, data?: Partial<BaseInterface>) => {
		return {
			...state,
			...initialData,
			...data,
		};
	},

	setBaseHealth: (state, health) => {
		return {
			...state,
			health,
		};
	},

	setBaseDead: (state, completed) => {
		return {
			...state,
			completed,
		};
	},
});
