import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import { broadcasterMiddleware } from "./middleware/broadcaster";
import { $NODE_ENV } from "rbxts-transform-env";

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

export function createStore(): typeof store {
	const store = combineProducers({
		...slices,
	});

	store.applyMiddleware(broadcasterMiddleware());

	return store;
}

export const store = createStore();
