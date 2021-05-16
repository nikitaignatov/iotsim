<script lang="ts">
  export let active
  $: color = active ? 'border-green-400' : 'border-blue-200'
</script>

<div class="flex items-center justify-center px-4 mb-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg border {color}  shadow-lg">
    <slot />
  </div>
</div>
