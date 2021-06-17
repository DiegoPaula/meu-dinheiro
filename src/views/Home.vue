<template>
  <div class="text-center font-black rounded-xl bg-white bg-opacity-25 pb-20">
    <h1 class="text-6xl leading-normal">Meu Dinheiro</h1>

    <section class="flex w-full px-5">
      <div class="w-1/2 p-4">
        <h2 class="text-2xl mb-4">Seus Registros:</h2>
        <ul class="flex flex-wrap justify-center w-2/3 mx-auto">
          <li class="bg-white w-28 min-h-8 p-1 align-text-bottom border" v-for="registro in listaDeRegistros" :key="registro.nomeRegistro">
            <router-link class="block capitalize" :to="`/${registro.nomeRegistro}`">
              {{ registro.nomeRegistro }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="w-1/2 p-4">
        <h2 class="text-2xl mb-4">Suas Listas:</h2>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'listaDeRegistros'
    ])
  }
}
</script>