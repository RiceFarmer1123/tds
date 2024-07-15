import { Players } from "@rbxts/services";
import { MAX_PLAYERS } from "types/constants/game-configs";

/**
 * Registers a callback function to be called when a player's character is
 * added.
 *
 * @param player - The player whose character is being monitored.
 * @param callback - The callback function to be called when the character is
 *   added. It receives the character's rig as a parameter.
 * @returns A function that can be called to disconnect the callback from the
 *   event.
 */
export function onCharacterAdded(player: Player, callback: (rig: Model) => void): () => void {
	if (player.Character) {
		callback(player.Character);
	}

	const connection = player.CharacterAdded.Connect(callback);

	return () => {
		connection.Disconnect();
	};
}

export async function waitForPlayers<T extends number>(attemps: T, tick: T): Promise<void> {
	return new Promise((resolve, reject, onCancel) => {
		if (!onCancel()) {
			Promise.retryWithDelay(
				async () => {
					if (Players.GetPlayers().size() >= MAX_PLAYERS) {
						resolve();
					} else {
						reject(`Not enough players`);
					}
				},
				attemps,
				tick,
			);
		}
	});
}

export function safelyGetPlayerFromName(name: string): Player | undefined {
	const [succ, player] = pcall(() => Players.GetPlayers().find((v) => v.Name === name));
	if (!succ) return;

	return player;
}
