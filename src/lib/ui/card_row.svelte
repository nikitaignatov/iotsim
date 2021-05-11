<script lang="ts">
  export let label
  export let data
</script>

<div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
  <p class="text-gray-600 text-left">
    <slot name="name">{label}</slot>
  </p>
  <p class="text-right">
    <slot name="input">{data}</slot>
  </p>
</div>
