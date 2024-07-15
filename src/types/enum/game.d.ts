declare const enum Status {
	// data
	PlayerProfileUndefined,

	NotEnoughPlayers,
	Started,
	Ended,
	Victory,
	Loss,
}

declare const enum Loss {
	LowHP // when the base health reaches 0
}

export default Status;
