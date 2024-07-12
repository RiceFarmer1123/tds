import Log, { LogLevel, Logger } from "@rbxts/log";
import { RunService } from "@rbxts/services";

import { $package } from "rbxts-transform-debug";
import { $NODE_ENV } from "rbxts-transform-env";

export const LOG_LEVEL: LogLevel = $NODE_ENV === "development" ? LogLevel.Debugging : LogLevel.Information;

export function setupLogger(): void {
	Log.SetLogger(
		Logger.configure()
			.SetMinLogLevel(LOG_LEVEL)
			.EnrichWithProperty("Version", $package.version)
			.WriteTo(Log.RobloxOutput())
			.Create(),
	);
}
