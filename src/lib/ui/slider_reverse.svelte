<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  import RangeSlider from 'svelte-range-slider-pips'
  export let min, max
  export let value
  let rescale = v => Math.round(v - min / max - min)
  let reverse = v => max - rescale(v)
  let values = [max - rescale(value)]
</script>

<RangeSlider
  on:stop={x => {
    dispatch('update', {
      value: reverse(x.detail.value)
    })
  }}
  formatter={reverse}
  handleFormatter={reverse}
  {values}
  {min}
  {max}
  range="max"
  float="true"
  vertical
/>

<style>
  :global(.vertical) {
    height: 300px;
  }
</style>
