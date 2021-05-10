<script>
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  let chart
  export let series
  export let min, max
  let options = {
    series: [],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 100,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150
        }
      }
    },
    xaxis: {
      type: 'numeric'
    },
    yaxis: {
      min,
      max
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }
  }
  onMount(async () => {
    const wrapper = await import('./wrapper')
    const store = await import('../store')
    chart = wrapper.chart

    store.sim.subscribe(x => {
      options.series = [{ data: x.profiles[series] }]
    })
  })
</script>

{#if browser && options && chart}
  <div>
    <div use:chart={options} />
  </div>
{/if}
