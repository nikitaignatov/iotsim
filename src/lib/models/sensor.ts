import type { Device, Sensor, DeviceProfile } from '../types/sensor'

export let Accelerometer: Sensor = {
    identifier: "Accelerometer", measurements: [
        { name: "x", value_type: "float", unit: "g", range: { min: 0, max: 16 } },
        { name: "y", value_type: "float", unit: "g", range: { min: 0, max: 16 } },
        { name: "z", value_type: "float", unit: "g", range: { min: 0, max: 16 } },
    ]
}

export let Gyroscope: Sensor = {
    identifier: "Gyroscope", measurements: [
        { name: "x", value_type: "float", unit: "°/s", range: { min: 0, max: 16 } },
        { name: "y", value_type: "float", unit: "°/s", range: { min: 0, max: 16 } },
        { name: "z", value_type: "float", unit: "°/s", range: { min: 0, max: 16 } },
    ]
}

export let sht30: Sensor = {
    identifier: "SHT30", measurements: [
        { name: "temperature", value_type: "float", unit: "°C", range: { min: -40, max: 125 } },
        { name: "humidity", value_type: "float", unit: "%RH", range: { min: 0, max: 100 } }
    ], datasheet: 'https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHT3xA_Datasheet.pdf'
}

export let bme280: Sensor = {
    identifier: "bme280", measurements: [
        { name: "temperature", value_type: "float", unit: "°C", range: { min: -40, max: 84 } },
        { name: "humidity", value_type: "float", unit: "%RH", range: { min: 0, max: 100 } },
        { name: "pressure", value_type: "float", unit: "hPa", range: { min: 300, max: 1100 } }
    ], datasheet: 'https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf'
}

export const aqara_sensor_WSDCGQ11LM: Device = {
    identifier: "WSDCGQ11LM",
    name: 'Aqara Temperature and Humidity Sensor',
    state: "on",
    datasheet: 'https://www.aqara.com/us/temperature_humidity_sensor.html',
    sensors: [sht30]
}

export const test: DeviceProfile = {
    name: "test",
    device: aqara_sensor_WSDCGQ11LM,
}

