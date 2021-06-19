<template>
  <div
    id="app"
    class="
      min-h-screen
      w-full
      font-mono
      bg-gradient-to-r
      from-teal-500
      to-green-500
    "
    style="
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-image: url('https://images.unsplash.com/photo-1620768237794-f3bfe964f9f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80');
      background-color: rgba(0, 0, 0, 0.3);
      background-blend-mode: darken;
    "
  >
    <nav class="w-full bg-clip-text">
      <ul class="flex w-full bg-white p-2 h-14 items-center justify-between">
        <h1
          class="
            bg-gradient-to-r
            from-teal-500
            to-green-500
            bg-clip-text
            w-1/4
            text-center
          "
        >
          <router-link :to="'/'" class="text-2xl text-transparent"
            >Meu Dinheiro</router-link
          >
        </h1>
        <li class="w-1/4 text-center">
          <router-link :to="'/controle'">Meus Registros</router-link>
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
