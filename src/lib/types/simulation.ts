export type RangeSingleInput = [number]

Array.prototype.first = function () {
    return this[0];
}

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
