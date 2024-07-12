import { createProducer } from "@rbxts/reflex";
import EnemyType from "types/enum/enemies";

export type Enemies = {
	readonly [wave: number]: {
		readonly [enemy in keyof typeof EnemyType]?: EnemyData;
	};
};

export interface EnemyData {
	id: string;
	instance?: Instance;
}

export enum WaveStatus {
	INIT,
	STARTED,
	ENDED,
}

interface WaveStates {
	OnTick: number;
	Waves: number;
	WaveStatus: WaveStatus;
	Enemies: Map<string, Instance>;
}

const initialState: WaveStates = {
	OnTick: tick(),
	Waves: 1,
	WaveStatus: WaveStatus.INIT,
	Enemies: new Map<string, Instance>(),
};

export const waveSlice = createProducer(initialState, {
	loadWaves: (state, waves: Partial<WaveStates>) => {
		return {
			...state,
			...waves,
		};
	},

	setWaves: (state, Waves: number) => {
		return {
			...state,
			Waves,
		};
	},
	setWaveTick: (state, OnTick) => {
		return {
			...state,
			OnTick,
		};
	},

	insertEnemy: (state, enemyData: Required<EnemyData>) => {
		const enemies = state.Enemies;
		enemies.set(enemyData.id, enemyData.instance);

		return {
			...state,
			Enemies: enemies,
		};
	},

	removeEnemy: (state, id: string) => {
		const enemies = state.Enemies;
		enemies.delete(id);

		return {
			...state,
			Enemies: enemies,
		};
	},
});
