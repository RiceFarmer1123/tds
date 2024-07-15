import { Service, OnStart, OnInit, Modding } from "@flamework/core";
import { Logger } from "@rbxts/log";

export interface OnPlayerJoin {
	/**
	 * onPlayerJoin event
	 * Fires when the player is fully loaded and initiated
	 * @param player
	 * @returns void
	 */
	onPlayerJoin(player: Player): void;
}

export interface OnPlayerLeave {
	/**
	 * onPlayerLeave event
	 * Fires when the player leaves
	 * @param player
	 * @returns void
	 */
	onPlayerLeave(player: Player): Promise<void>;
}

export type LifeCycle = OnPlayerJoin | OnPlayerLeave;

@Service({})
export default class PlayerService implements OnInit {
	constructor(private readonly logger: Logger) {}

	public onInit() {
		game.BindToClose(() => {
			this.logger.Info(`Server shutting down soon...`);
		});
	}

	private async onPlayerJoin(player: Player): Promise<void> {
		debug.profilebegin("PLAYER_LOADING");

		debug.profileend();
	}
}
