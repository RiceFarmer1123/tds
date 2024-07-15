import { Registry } from "@rbxts/ecr";
import { RootStore } from "./services/store/global";
import { System } from "shared/types";

export type ServerEcsArgs = [Registry, RootStore, Map<string, unknown>];
export type ServerSystem = System<ServerEcsArgs>;