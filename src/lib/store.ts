import { writable, derived } from "svelte/store";
import { localStore } from "./localStore";
import type { Device } from "./types/sensor";
import type { SensorProfiles, Simulation, SimulationParams } from "./types/simulation";

const range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export let devices = localStore<Device[]>('devices', []);

export let params = localStore<SimulationParams>('params', {
    name: 'test',
    datapoints: [8],
    interval: [5]
});

export let profiles = localStore<SensorProfiles>('profiles', {
    profiles: [
        (new Array(64).fill(0).map((_) => range(-40, 125))),
        (new Array(64).fill(0).map((_) => range(0, 100))),
    ]
});

export let sim = derived([params, profiles], ([a, b]): Simulation => {
    if (a.datapoints[0] === b.profiles[0].length) {
        return { ...a, ...b }
    } else if (a.datapoints[0] <= b.profiles[0].length) {
        return {
            ...a, profiles: [
                b.profiles[0].slice(0, a.datapoints[0]),
                b.profiles[1].slice(0, a.datapoints[0])
            ]
        }
    } else {
        while (a.datapoints[0] >= b.profiles[0].length) {
            b.profiles[0].push(0)
            b.profiles[1].push(0)
        }

        return { ...a, ...b }
    }
})