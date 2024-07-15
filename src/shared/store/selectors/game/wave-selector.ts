import { SharedState } from "shared/store";

export const selectWaveCount = (state: SharedState) => state.waveSlice.Waves;
export const selectWaveStatus = (state: SharedState) => state.waveSlice.WaveStatus;

export const selectEnemiesCount = (state: SharedState) => state.waveSlice.Enemies.size();
