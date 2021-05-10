<script lang="ts">
  import Slider from '$lib/slider/index.svelte'
  import Chart from '$lib/chart/chart.svelte'
  import { sim } from '$lib/store'
  export let measurement
  export let update = (x, i) => {}
</script>

<div class=" flex items-center justify-center px-4 my-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg shadow-lg">
    <div class="p-4 border-b">
      <h2 class="text-2xl ">{measurement.name}</h2>
      <p class="text-sm text-gray-500">Simulation data profile</p>
    </div>
    <div>
      <div class="">
        <div class="p-2 w-full">
          <Chart max={measurement.range.max} min={measurement.range.min} series={0}  />
        </div>
        <h2>Configure data profile</h2>
        <div class="overflow-x-auto rounded-b-lg bg-transparent">
          <div class="min-w-max py-8 px-10">
            {#each $sim.profiles[0] as sensor, i}
              <Slider
                max={125}
                min={-40}
                value={sensor}
                on:update={x => update(x.detail.value, i)}
              />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
