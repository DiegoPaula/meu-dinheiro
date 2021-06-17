<template>
  <div id="app" class="min-h-screen w-full font-mono bg-gradient-to-r from-teal-500 to-green-500">
  <nav class="w-full bg-clip-text ">
    <ul class="flex w-full bg-white p-2 h-14 items-center justify-center">
      <h1 class="bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text w-1/4 ">
        <router-link :to="'/'"  class="text-2xl text-transparent">Meu Dinheiro</router-link>
      </h1>
      <li class="w-1/4 text-center">
        <router-link :to="'/controle'">Controle Financeiro</router-link>
      </li>
      <li class="w-1/4 text-center">
        <router-link :to="'/desejos'">Lista de Desejos</router-link>
      </li>
    </ul>
  </nav>

  <div class="p-10">
    <router-view />
  </div>
  
  </div>
</template>

<script>
export default {};
</script>

<style></style>
