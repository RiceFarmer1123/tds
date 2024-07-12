export type System<T extends unknown[]> = {
	init?: (...args: T) => void;
	update: (dt: number, frameNumber: number, ...args: T) => void;
	event?: string;
	cleanup?: (...args: T) => void;
	before?: System<T>[];
	toString: () => string;
};

export type BeforeFrameMiddleware<T extends unknown[]> = (
	dt: number,
	frameNumber: number,
	scheduledSystems: System<T>[],
	event: string,
	...args: T
) => void;
export type AfterFrameMiddleware<T extends unknown[]> = (
	dt: number,
	frameNumber: number,
	frameResults: Map<System<T>, [string, number]>,
	event: string,
	...args: T
) => void;