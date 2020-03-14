<template>
  <div class="container">
    <div>
      <h1 class="title">
        CoinPet
      </h1>
      <h2 class="subtitle">
        Hi! I will make you a rich :D wow!!
      </h2>
      <button @click="getCoin" v-html="'Steal Coin'" />
      <pre>
{{ JSON.stringify(coin) }}
      </pre>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      coin: null
    }
  },
  methods: {
    async getCoin () {
      const res = await fetch(`http://localhost:5000/coin`)
      this.coin = await res.json()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

pre {
  display: flex;
  width: 100%;
  padding: 3rem;
  justify-content: center;
}
</style>
