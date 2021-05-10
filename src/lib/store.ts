import { writable, derived } from "svelte/store";
import type { SensorProfiles, Simulation, SimulationParams } from "./types/simulation";

const range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export let params = writable<SimulationParams>({
    name: 'test',
    datapoints: [8],
    interval: [5]
});

export let profiles = writable<SensorProfiles>({
    profiles: [
        (new Array(64).fill(0).map((_) => range(0, 100))),
        (new Array(64).fill(0).map((_) => range(-40, 125))),
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

export let chart = derived([sim], ([input]) => {
    return {
        series: [
            {
                data: input.profiles[0]
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 100
            }
        },
        xaxis: {
          type: 'numeric'
        },
        yaxis: {
            min: 0,
            max: 200,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            align: 'center'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        }
    }
});
