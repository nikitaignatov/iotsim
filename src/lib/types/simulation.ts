export type RangeSingleInput = [number]

export type SimulationParams = {
    name: string,
    datapoints: RangeSingleInput,
    interval: RangeSingleInput
}

export type SensorProfiles = {
    profiles: number[][]
}

export type Simulation =
    SimulationParams & SensorProfiles
