<script lang="ts">
  import type { Device } from '$lib/types/sensor'
  import { profile } from '$lib/store'
  import Details from './details.svelte'
  import Configuration from './configuration.svelte'

  export let device: Device;
</script>

<Details {device} />

{#each device.sensors as sensor}
  {#each [sensor.measurements[0]] as m}
    <Configuration measurement={m} data={$profile} />
  {/each}
{/each}
