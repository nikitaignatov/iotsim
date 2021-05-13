<script lang="ts">
  import type { Device } from '$lib/types/sensor'
  import { sim, params, profiles } from '$lib/store'
  import Details from './details.svelte'
  import Configuration from './configuration.svelte'
  import { count, publish, state } from '$lib/types/mqtt_connector'
  import Simulation from './simulation.svelte'
  import Connection from './connection.svelte'

  export let device: Device
</script>

<Details {device} />

<Simulation
  state={$state}
  count={$count}
  total={$profiles.profiles[0].length}
  publish={() => publish($sim)}
/>

{#each device.sensors as sensor}
  {#each sensor.measurements as m, y}
    <Configuration
      measurement={m}
      ix={y}
      update={(x, i) => {
        $profiles.profiles[y][i] = x
      }}
    />
  {/each}
{/each}

<Connection />
