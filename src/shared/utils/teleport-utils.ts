import { Players, TeleportService } from "@rbxts/services";
import { safelyGetPlayerFromName } from "./player-entity";
import Object from "@rbxts/object-utils";

export type TeleportData = string | number | Record<number, string>;

export async function TeleportSafely(placeID: number, teleportData: string): Promise<void>;
export async function TeleportSafely(placeID: number, teleportData: number): Promise<void>;
export async function TeleportSafely(placeID: number, teleportData: Record<number, string>): Promise<void>;
export async function TeleportSafely(placeID: number, teleportData: TeleportData): Promise<void>;


export async function TeleportSafely(
	placeID: number,
	teleportData: string | number | Record<number, string>,
): Promise<void> {
	Promise.try(() => {
		if (placeID === undefined || teleportData === undefined) return;

		const players = new Map<number, Player>();
		const nextNode = players.size() + 1
		switch (typeOf(teleportData)) {
			case "string":
				players.set(nextNode, safelyGetPlayerFromName(teleportData as string) as Player);
				break;
			case "number":
				players.set(nextNode, Players.GetPlayerByUserId(teleportData as number) as Player);
				break;
			default:
				// record of players
				Object.values(teleportData as Record<number, string>).forEach((v, i) => {
					players.set(players.size() + 1, safelyGetPlayerFromName(v) as Player);
				});

				break;
		}

		return TeleportService.TeleportAsync(placeID, Object.values(players));
	}).catch((err) => warn(`Failed to teleport players: ${teleportData}`));
}
