<script lang="ts">
  import { profile } from '$lib/store'
  import RangeSlider from 'svelte-range-slider-pips'

  export let state
  export let count
  export let total
  export let publish
  let interval = [5]
  let datapoints = [32]
  let noise = [0.0]
  let repeat = [1]

  $: total = datapoints[0] * repeat[0]
  $: duration = total * interval[0]
</script>

<div class="flex items-center justify-center px-4 mb-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
    <!-- datapoints -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Number of data points</p>
      <p class="text-right">
        <RangeSlider
          min={1}
          max={64}
          bind:values={datapoints}
          pips
          pipstep={4}
          float
          last="label"
          first="label"
        />
      </p>
    </div>
    <!-- introduce noise -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Noise</p>
      <p>
        <RangeSlider min={0} max={25} bind:values={noise} pips last="label" first="label" float />
      </p>
    </div>
    <!-- interval -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Interval</p>
      <p class="text-right">
        <RangeSlider
          min={1}
          max={60}
          step={1}
          bind:values={interval}
          pips
          last="label"
          first="label"
          float
        />
      </p>
    </div>
    <!-- reccurring -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Repeat</p>
      <p class="text-right">
        <RangeSlider min={1} max={10} bind:values={repeat} pips last="label" first="label" float />
      </p>
    </div>
    <!-- duration -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Duration</p>
      <p class="text-right">{(duration / 60.0).toFixed(1)} min</p>
    </div>
    <!-- datapoints total -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Published datapoints</p>
      <p class="text-right">{total}</p>
    </div>
    {#if state === 'running'}
      <button
        disabled
        class="text-center m-5 max-w-full bg-green-600 rounded-md text-white py-3 font-medium"
        >Sending Data</button
      >
      <div class="shadow w-full bg-gray-100 mt-2 text-center rounded-b-lg">
        <div
          class="bg-green-600 text-xs leading-none pt-1  {count === total
            ? 'rounded-b-lg'
            : 'rounded-bl-lg'} text-white"
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
  </div>
</div>
