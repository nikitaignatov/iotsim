<script lang="ts">
  import { sim, params } from '$lib/store'
  import Card from '$lib/ui/card.svelte'
  import CardRow from '$lib/ui/card_row.svelte'
  import CardSlider from '$lib/ui/card_slider.svelte'

  export let state
  export let count
  export let total
  export let publish
  let noise = [0.0]
  let repeat = [1]

  $: total = $sim.datapoints[0] * repeat[0]
  $: duration = total * $sim.interval[0]
  $: active = state === 'running'
  $: connecting = state === 'connecting'
</script>

<Card>
  <CardSlider bind:value={$params.datapoints} min={1} max={32} disabled={active}>
    Number of data points: <span class="text-black">{$params.datapoints}</span>
  </CardSlider>
  <CardSlider bind:value={$params.interval} min={1} max={60} disabled={active}>
    Interval: <span class="text-black">{$params.interval}</span>sec
  </CardSlider>
  <CardSlider bind:value={repeat} min={1} max={10} disabled={active}>
    Repeat: <span class="text-black">{repeat}</span>x
  </CardSlider>
  <CardRow label="Duration" data={(duration / 60.0).toFixed(1) + ' min'} />
  <CardRow label="Total datapoints" data={total} />
  <hr />
  {#if active}
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
  {:else if connecting}
    <h2 class="text-center  m-5 max-w-full text-green-600 py-3 font-medium">Connecting</h2>
  {:else}
    <button
      on:click={x => {
          state = 'connecting'
        publish()
      }}
      class="text-center  m-5 max-w-full bg-blue-800 rounded-md text-white py-3 font-medium hover:bg-blue-900 hover:shadow-md"
      >Run Simulation</button
    >
  {/if}
</Card>
