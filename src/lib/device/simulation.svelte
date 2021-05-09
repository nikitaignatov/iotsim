<script lang="ts">
  import { sim, params } from '$lib/store'
  import RangeSlider from 'svelte-range-slider-pips'

  export let state
  export let count
  export let total
  export let publish
  let noise = [0.0]
  let repeat = [1]

  $: total = $sim.datapoints[0] * repeat[0]
  $: duration = total * $sim.interval[0]
</script>

<div class="flex items-center justify-center px-4 mb-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg shadow-lg">
    <!-- datapoints -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Number of data points {$params.datapoints}</p>
      <p class="text-right">
        <RangeSlider
          min={1}
          max={64}
          values={$params.datapoints}
          pips
          pipstep={4}
          float
          last="label"
          first="label"
          on:stop={x => ($params.datapoints = x.detail.values)}
        />
      </p>
    </div>
    <!-- introduce noise
      <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
        <p class="text-gray-600 text-left">Noise</p>
        <p>
          <RangeSlider min={0} max={25} bind:values={noise} pips last="label" first="label" float />
        </p>
      </div> -->
    <!-- interval -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Interval</p>
      <p class="text-right">
        <RangeSlider
          min={1}
          max={60}
          step={1}
          bind:values={$params.interval}
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
      <p class="text-gray-600 text-left">Total datapoints</p>
      <p class="text-right">{total}</p>
    </div>
    <hr />
    <div class="bg-gray-50  rounded-b-lg">
      {#if state === 'running'}
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600 text-left">Sent</p>
          <p class="text-right">{count} <small class="text-gray-400">messages</small></p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600 text-left">Remaining</p>
          <p class="text-right">{total - count} <small class="text-gray-400">messages</small></p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600 text-left">Remaining time</p>
          <p class="text-right">
            {(((total - count) * $sim.interval[0]) / 60.0).toFixed(1)}
            <small class="text-gray-400">min</small>
          </p>
        </div>
        <button
          disabled
          class="text-center m-5 max-w-full bg-green-600 rounded-md text-white py-3 font-medium"
          >Sending Data</button
        >
        <div class="shadow w-full mt-2 text-center rounded-b-lg">
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
</div>
