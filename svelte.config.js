import sveltePreprocess from 'svelte-preprocess'
import ssr from '@sveltejs/adapter-static'

const config = {
    preprocess: [
        sveltePreprocess({
            defaults: {
                style: 'postcss'
            },
            postcss: true
        })
    ],
    kit: {
        adapter: ssr(),
        target: '#svelte'
    }
}

export default config;