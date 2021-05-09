import { writable, derived } from "svelte/store";
const range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let data = (new Array(15).fill(0).map((_) => range(-40, 125)));

export let profile = writable(data);
export let chart = derived([profile], (input) => {
    return {
        series: [
            {
                data: input[0]
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
            }
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
