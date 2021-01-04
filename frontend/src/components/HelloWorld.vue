<template>
  <h1 class="text-2xl border rounded shadow text-center">{{ msg }}</h1>
  <h2>{{ cool }}</h2>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <button @click="count++" class="bg-gray-200 rounded text-4xl"> here </button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      cool: "it works fine",
    }
  }
}
</script>
