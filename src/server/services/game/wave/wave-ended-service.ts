import { Service, OnStart, OnInit } from "@flamework/core";
import { Logger } from "@rbxts/log";
import Object from "@rbxts/object-utils";
import { TeleportService } from "@rbxts/services";
import { TeleportData, TeleportSafely } from "shared/utils/teleport-utils";
import { LOBBY_ID } from "types/constants/game-configs";
import Status from "types/enum/game";

@Service({})
export default class WaveEndedService {
	constructor(private readonly logger: Logger) {}

	/**
	 * This responsible for handling actions corresponding to the wave status.
	 *
	 * @param actionArg
	 * @returns Promise<void>
	 */
	public async toAction(actionArg: Status, placeID: number, data: TeleportData): Promise<void> {
		const message = this.toMessage(actionArg) as string;
		//const [place, data] = pcall(() => [ placeID, args ]);

		switch (message) {
			case "Victory":
				TeleportSafely(placeID, data).andThen(() =>
					this.logger.Info(`Teleporting players to lobby: ${LOBBY_ID}`),
				);
				break;
			default:
				break;
		}
	}

	public toMessage(message: Status) {
		switch (message) {
			case Status.Victory:
				return "Victory";
			case Status.Loss:
				return "Loss";
			default:
				this.logger.Error(`Unknown status enum value: ${message}`);
				break;
		}
	}
}
