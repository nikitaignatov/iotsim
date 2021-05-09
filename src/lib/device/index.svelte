<script lang="ts">
  import type { Device } from '$lib/types/sensor'
  import { profile } from '$lib/store'
  import Details from './details.svelte'
  import Configuration from './configuration.svelte'
  import { count, publish, state } from '$lib/types/mqtt_connector'
  import Simulation from './simulation.svelte'

  export let device: Device
</script>

<Details {device} />

<Simulation
  state={$state}
  count={$count}
  total={$profile.length}
  publish={() => publish($profile)}
/>

{#each device.sensors as sensor}
  {#each [sensor.measurements[0]] as m}
    <Configuration measurement={m} data={$profile} />
  {/each}
{/each}
