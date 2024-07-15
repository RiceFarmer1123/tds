import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";
import { SharedState } from "./store";

interface ClientToServerEvents {
	store: {
		start: () => void;
	};
}

interface ServerToClientEvents {
	store: {
		dispatch: (actions: BroadcastAction[]) => void;
		hydrate: (state: SharedState) => void;
	};
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
