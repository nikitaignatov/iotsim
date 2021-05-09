<script>
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  let chart
  let options
  export let data
  export let min, max
  onMount(async () => {
    const wrapper = await import('./wrapper')
    const store = await import('../store')
    chart = wrapper.chart
    options = store.chart
    options.subscribe(x => {
      x.yaxis.max = max
      x.yaxis.min = min
    })
  })
</script>

{#if browser && options && chart && data}
  <div>
    <div use:chart={$options} />
  </div>
{/if}
