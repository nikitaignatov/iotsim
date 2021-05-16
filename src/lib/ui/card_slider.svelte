<script lang="ts">
  import RangeSlider from 'svelte-range-slider-pips'
  import CardRow from '$lib/ui/card_row.svelte'

  export let value, min, max, disabled
</script>

<CardRow>
  <span slot="name">
    <slot />
  </span>
  <span slot="input">
    <RangeSlider {min} {max} values={value} float on:stop={x => (value = x.detail.values)} {disabled} />
  </span>
</CardRow>
