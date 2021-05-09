<script lang="ts">
  import { aqara_sensor_WSDCGQ11LM } from '../lib/models/sensor'
  import Device from '$lib/device/index.svelte'
  import { browser } from '$app/env'
</script>

<svelte:head>
  <title>IoT Device Simulator</title>
</svelte:head>

{#if browser}
  <Device device={aqara_sensor_WSDCGQ11LM} />
{/if}
