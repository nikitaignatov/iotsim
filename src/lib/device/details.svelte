<script lang="ts">
  import type { Device } from '$lib/types/sensor'
  import Card from '$lib/ui/card.svelte'
  import CardRow from '$lib/ui/card_row.svelte'

  export let device: Device
</script>

<Card>
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
        <CardRow label={m.name}>
          <span slot="input">
            {m.range.min} &mdash; {m.range.max} <span class="text-gray-500">{m.unit}</span>
          </span>
        </CardRow>
      {/each}
    {/each}
  </div>
</Card>
