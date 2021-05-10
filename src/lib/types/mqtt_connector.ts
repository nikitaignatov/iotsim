import { writable, derived } from "svelte/store";
import { connect } from 'mqtt/dist/mqtt.js'
import type { Simulation } from "./simulation";

type connected = 'connected'
type disconnected = 'disconnected'
type running = 'running'
export type simulation = connected | disconnected | running

export let state = writable<simulation>('disconnected');
export let count = writable<number>(0);

export const mqtt_options = {
    clientId: ('iotsim_' + Math.round(Math.random() * 10000)),
    servers: [
        {
            host: 'test.mosquitto.org',
            protocol: 'wss',
            port: 8081
        }
    ],
    path: '/',
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
    topic: 'telemetry/sensor/aqara'
}

const send_data = (client, data: Simulation) => {
    let interval
    let c = 0
    const next = () => {
        if (c < data.profiles[0].length) {
            const payload = { temperature: data.profiles[0][c++] }
            count.set(c)
            client.publish(mqtt_options.topic, JSON.stringify(payload))
        } else {
            count.set(0)
            state.set('connected')
            console.log('clear')
            clearInterval(interval)
            client.end()
            state.set('disconnected')
        }
    }
    next()
    interval = setInterval(next, data.interval[0] * 1000)
}


export const publish = (data: Simulation) => {
    const client = connect(mqtt_options)
    client.on('connect', function () {
        state.set('connected')
        client.subscribe('telemetry/sensor/#', function (err) {
            if (!err) {
                state.set('running')
                send_data(client, data)
            }
        })
    })

    client.on('message', function (topic, message) {
        console.log(topic, message.toString())
    })
}