<script lang="ts">
  import RangeSlider from 'svelte-range-slider-pips'

  import { profile } from '$lib/store'

  export let min, max
  export let index
  export let result
  let rescale = v => Math.round(v - min / max - min)
  let reverse = v => max - rescale(v)
  export let values = [max - rescale($profile[index])]
</script>

<RangeSlider
  on:stop={x => {
    $profile[index] = reverse(x.detail.value)
    result = reverse(x.detail.value)
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
