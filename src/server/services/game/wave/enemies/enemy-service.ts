import { Components } from "@flamework/components";
import { Service, OnStart, OnInit } from "@flamework/core";
import { Janitor } from "@rbxts/better-janitor";
import { Logger } from "@rbxts/log";
import worldInspect from "@rbxts/matter/lib/debugger/widgets/worldInspect";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { store } from "server/services/store/global";
import { selectEnemiesCount } from "shared/store/selectors/game/wave-selector";
import Tree from "shared/utils/Tree";

/**
 * Services for handling enemies controllers
 */
@Service({})
export default class EnemyService implements OnStart {
	constructor(
		private readonly logger: Logger,
		private readonly janitor: Janitor,
		private readonly components: Components,
	) {}

	onStart() {}

	/**
	 * `getEnemy`
	 * Promisely returns the corresponding enemy - instance
	 *
	 * @param id
	 * @returns Instance
	 */
	public getEnemyAsync(id: string): Promise<Instance> {
		return new Promise((resolve, reject, onCancel) => {
			try {
				const model = Tree.Find(ReplicatedStorage, `@rbxts/assets/enemies/${id}`) as Instance;
				if (model) {
					resolve(model);
				}

				const promise = Promise.fromEvent(
					Tree.Find(ReplicatedStorage, "@rbxts/assets/enemies").DescendantAdded,
					(model) => model.IsA("Model") && model.Name === id,
				);

				const [success, enemy] = promise.await();
				if (!success) {
					this.logger.Error(`Failed to retrieve model: ${id.upper()}`);
				}

				resolve(enemy as Instance as Model);
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * `spawnEnemyAsync`
	 * Gets the model corresponding to the id and spawns i
	 *
	 * @param id
	 * @returns Promise<void>
	 */
	public async spawnEnemyAsync(id: string): Promise<void> {
		const model = (await this.getEnemyAsync(id)).Clone();
		if (model.GetAttribute("Node") === undefined) {
			model.SetAttribute("Node", "N1");
		}
		if (!model.IsDescendantOf(Workspace)) {
			model.Parent = Workspace;
		}

		model.AddTag("EnemyComponent");
		store.insertEnemy({
			id,
			instance: model as Instance,
		});

		this.janitor.addFunction(() => {
			// just checks if its still in the workspace then we can safely remove it
			(model as Model).IsDescendantOf(Workspace) && (model as Model).Destroy();
			model.RemoveTag("EnemyComponent");
		});
	}
}
