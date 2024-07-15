import { Service, OnStart, OnInit } from "@flamework/core";
import { Janitor } from "@rbxts/better-janitor";
import { Logger } from "@rbxts/log";
import { onCharacterAdded } from "shared/utils/player-entity";
import { onPlayerJoin } from "types/interface/player";

export interface zoneEntered {
	onZoneEntered(player: Player): void;
}

export interface zoneRemoved {
	onZoneRemoved(player: Player): void
}

@Service({})
export class CombatService implements onPlayerJoin {
	private readonly janitor = new Janitor();
	private inZone = false;

	constructor(private readonly logger: Logger) {}

	private getPvpAttribute(humanoid: Humanoid): AttributeValue {
		return !humanoid.GetAttributes().isEmpty() && (humanoid.GetAttribute("IsPVP") as AttributeValue | never);
	}

	private getAttackTick(humanoid: Humanoid): number | undefined {
		return !humanoid.GetAttributes().isEmpty()
			? (humanoid.GetAttribute("AttackTick") as AttributeValue as number)
			: undefined;
	}

	private async promiseDataLoaded(player: Player): Promise<void> {}

	private async onInteracted(player: Player, otherPlayer: Player, humanoid: Humanoid) {
		const isPVP = this.getPvpAttribute(humanoid);
		if (isPVP === undefined) {
			this.logger.Error(`${player.Name} tried to pvp but character / data has not loaded yet, 
                                \n while interacting with ${otherPlayer.GetFullName()}`);
		}

		const lastAttackTick = tick();
		const attack = this.getAttackTick(humanoid) as number;
		
	}

	public onPlayerJoin(player: Player): void {
		const event = onCharacterAdded(player, (model) => {
			const humanoid = model.FindFirstChildOfClass("Humanoid");
			if (!humanoid) {
				this.logger.Info(`Failed to get humanoid for: ${player.GetFullName()}`);
				return;
			}

			if (humanoid.GetAttribute("IsPVP") === undefined) humanoid.SetAttribute("IsPVP", false);
		});

		this.janitor.addFunction(event);
	}
}
