type PatternSizeRange = { min: 1, max: 64 }

export type SensorSimulation = { datapoints: number, repetitions: number, noise: number }
export type Simulation = { name: string, datapoints: number, interval: number, profiles: number[] }
export type SimulationDefinition = { name: string, size: PatternSizeRange, noise: PatternSizeRange }
