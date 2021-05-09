<script lang="ts">
  import type { Device } from '$lib/types/sensor'
  import { profile } from '$lib/store'
  import { count, publish, state } from '$lib/types/mqtt_connector'
  import Simulation from './simulation.svelte'

  export let device: Device
</script>

<div class="flex items-center justify-center px-4 mb-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
    <div class="p-4 border-b">
      <h2 class="text-2xl ">{device.identifier}</h2>
      <p class="text-sm text-gray-500">{device.name}</p>
    </div>
    <div>
      {#each device.sensors as sensor}
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600 text-left">Sensor</p>
          <p class="text-right">
            {sensor.identifier}
            {#if sensor.datasheet}
              <a href={sensor.datasheet} target="_blank">Datasheet &RightArrow;</a>
            {/if}
          </p>
          <p class="text-right" />
        </div>
        {#each sensor.measurements as m}
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600  text-left">{m.name}</p>
            <p class="text-right">
              {m.range.min} &mdash; {m.range.max} <span class="text-gray-500">{m.unit}</span>
            </p>
          </div>
        {/each}
      {/each}
    </div>

    <Simulation
      state={$state}
      count={$count}
      total={$profile.length}
      publish={() => publish($profile)}
    />
  </div>
</div>
