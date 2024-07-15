import { Service, OnStart, OnInit } from "@flamework/core";
import { Logger } from "@rbxts/log";
import Object from "@rbxts/object-utils";
import { store } from "server/services/store/global";
import { selectBaseHealth } from "shared/store/selectors/game/base-selector";
import { selectPlayers } from "shared/store/selectors/players-selector";
import { MAX_PLAYERS } from "types/constants/game-configs";
import { onPlayerJoin } from "types/interface/player";

@Service({})
export default class BaseService implements onPlayerJoin {
	/** @ignore */
	constructor(private readonly logger: Logger) {}

	onPlayerJoin(player: Player): void {
		const players = Object.keys(store.getState().playersSlice);
		if (players.size() >= MAX_PLAYERS) {
			store.loadBase({
				health: 650,
				max_health: 650,
			});
			this.observeBaseHealth();
		}
	}

	private observeBaseHealth() {
		// observe base's health till it reaches 0
		store.subscribe(
			selectBaseHealth,
			(health) => health <= 0,
			() => {
				store.setBaseDead(true);
			},
		)();
	}
}
