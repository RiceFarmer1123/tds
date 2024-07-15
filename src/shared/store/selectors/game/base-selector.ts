import { SharedState } from "shared/store";

export const selectBaseHealth = (state: SharedState) => state.baseSlice.health as number