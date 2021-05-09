<script lang="ts">
  import { profile } from '$lib/store'

  export let state
  export let count
  export let total
  export let publish
</script>

{#if state === 'running'}
  <button
    disabled
    class="text-center m-5 max-w-full bg-green-600 rounded-md text-white py-3 font-medium"
    >Sending Data</button
  >

  <div class="shadow w-full bg-gray-100 mt-2 text-center">
    <div
      class="bg-green-600 text-xs leading-none py-1 text-white"
      style="width: {(count / (total || 1)) * 100}%"
    />
  </div>
{:else}
  <button
    on:click={x => publish()}
    class="text-center  m-5 max-w-full bg-blue-800 rounded-md text-white py-3 font-medium hover:bg-blue-900 hover:shadow-md"
    >Run Simulation</button
  >
{/if}
