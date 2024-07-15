export interface onPlayerJoin {
	/**
	 * onPlayerJoin event
	 * Fires when the player is fully loaded and initiated
	 * @param player
	 * @returns void
	 */
	onPlayerJoin(player: Player): void;
}

export interface onPlayerLeave {
	/**
	 * onPlayerLeave event
	 * Fires when the player leaves
	 * @param player
	 * @returns void
	 */
	onPlayerLeave(player: Player): void;
}

export type LifeCycle = onPlayerJoin | onPlayerLeave;
