import { Flamework, Modding } from "@flamework/core";
import Log, { LogLevel, Logger } from "@rbxts/log";
import { $package } from "rbxts-transform-debug";
import { $NODE_ENV } from "rbxts-transform-env";
import { GAME_NAME } from "shared/constants";

const LOG_LEVEL: LogLevel = $NODE_ENV === "development" ? LogLevel.Debugging : LogLevel.Information;

export = function () {
	Log.SetLogger(
		Logger.configure()
			.SetMinLogLevel(LOG_LEVEL)
			.EnrichWithProperty("Version", $package.version)
			.WriteTo(Log.RobloxOutput())
			.Create(),
	);

	Log.Info(`${GAME_NAME} is starting up! Version: ${game.PlaceVersion}`);

	Modding.registerDependency<Logger>((ctro) => Log.ForContext(ctro));
	Flamework.addPaths("src/server/services");
	Flamework.ignite();
	Log.Info("Flamework ignited!");
};
