import { writable, derived } from "svelte/store";
import { connect } from 'mqtt/dist/mqtt.min.js'

type connected = 'connected'
type disconnected = 'disconnected'
type running = 'running'
export type simulation = connected | disconnected | running

export let state = writable<simulation>('disconnected');
export let count = writable<number>(0);

const mqtt_options = {
    clientId: 'sdrfvfdvsfdv' + Math.random(),
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
    rejectUnauthorized: false
}

const send_data = (client, data) => {
    let interval
    let c = 0
    const next = () => {
        if (c < data.length) {
            const payload = { temperature: data[c++] }
            count.set(c)
            client.publish('telemetry/sensor/w', JSON.stringify(payload))
        } else {
            state.set('connected')
            console.log('clear')
            clearInterval(interval)
            client.end()
            state.set('disconnected')
        }
    }

    interval = setInterval(next, 1000)
}


export const publish = (data) => {
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