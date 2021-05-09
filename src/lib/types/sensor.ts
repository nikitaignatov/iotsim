type On = "on"
type Off = "off"
type DeviceState =
    | On
    | Off

type url = string
type range = { min: number, max: number }

export type Measurement = { name: string, value_type: string, unit: string, range: range }
export type Sensor = { identifier: string, measurements: Measurement[], datasheet?: url }

export type Device = { identifier: string, name: string, sensors: Sensor[], state: DeviceState, datasheet?: url }
export type DeviceProfile = { name: string, device: Device }
