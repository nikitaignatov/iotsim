<script lang="ts">
  import { mqtt_options } from '$lib/types/mqtt_connector'
</script>

<div class="flex items-center justify-center px-4 mb-10">
  <div class="max-w-4xl  bg-white w-full rounded-lg shadow-lg">
    <!-- host -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Host</p>
      <p class="text-right">
        <input type="text" bind:value={mqtt_options.servers[0].host} />
      </p>
    </div>
    <!-- port -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Port</p>
      <p class="text-right">
        <input type="text" bind:value={mqtt_options.servers[0].port} />
      </p>
    </div>
    <!-- port -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">Protocol</p>
      <p class="text-right">
        <input type="text" bind:value={mqtt_options.servers[0].protocol} />
      </p>
    </div>
    <!-- client id -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">clientId</p>
      <p class="text-right">
        <input type="text" bind:value={mqtt_options.clientId} />
      </p>
    </div>
    <!-- topic -->
    <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
      <p class="text-gray-600 text-left">clientId</p>
      <p class="text-right">
        <input type="text" bind:value={mqtt_options.topic} />
      </p>
    </div>
  </div>
</div>
