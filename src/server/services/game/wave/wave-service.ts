import { Service, OnStart, OnInit } from "@flamework/core";
import { onPlayerJoin, onPlayerLeave } from "types/interface/player";
import { store } from "../../store/global";
import Object from "@rbxts/object-utils";
import { DEFAULT_CASH, MAX_PLAYERS, MAX_WAVES } from "types/constants/game-configs";
import { selectPlayerCash, selectPlayerData, selectPlayers } from "shared/store/selectors/players-selector";
import { Logger } from "@rbxts/log";
import { InitialPlayerData } from "shared/store/slices/players-slice";
import { ReplicatedStorage } from "@rbxts/services";
import { waitForPlayers } from "shared/utils/player-entity";
import type { Enemies } from "shared/store/slices/game/wave-slice";

export const RETRY_ATTEMPTS = 10; // attempts of waiting for players, else return them back to the lobby
export const RETRY_TICK = 5; // 5 seconds per attempt

/**
 * Service for periodically run waves
 */
@Service({})
export class WaveService implements OnStart, onPlayerJoin, onPlayerLeave {
	private readonly waves: Enemies = {
		[0]: {
			Scrap: {
				id: "Scrap",
			},
		},
	};

	/** @ignore */
	constructor(private readonly logger: Logger) {}

	/** @ignore */
	onStart() {
		waitForPlayers(RETRY_ATTEMPTS, RETRY_TICK)
			.andThen(() => {
				const playersArr = Object.values(store.getState().playersSlice);
				// enough players we can start now
				// set their starting cash
				playersArr.forEach((v, i) => store.setPlayerCash(v.ID, DEFAULT_CASH));

				for (let i = 0; i < MAX_WAVES; i++) {
					store.setWaves(i);
				}

				/**
				 *
				 */
				// shift to whoever is the highest cash holder
				store.observe(selectPlayers, (player) => {
					store.subscribe(
						selectPlayerCash(player.ID),
						(state) => state > 0,
						(state) => {
							// sort in ascending order
							playersArr.sort((a, b) => a.Cash > b.Cash);
						},
					);
				});
			})
			.catch((err) => {
				this.logger.Error(`Failed to wait for players: ${err}`);
			});
	}

	public onPlayerJoin(player: Player): void {
		const players = Object.keys(store.getState().playersSlice);
		if (players.size() < MAX_PLAYERS) {
			store.loadPlayerData(player.UserId, {
				UnitsPlaced: [],
			});
		}
	}

	public onPlayerLeave(player: Player): void {}
}
