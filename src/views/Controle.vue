<template>
  <div class="text-center font-black rounded bg-white bg-opacity-40 pb-20">
    <h1 class="text-6xl leading-normal">Meus Registros</h1>

    <form class="my-20">
      <input
        class="px-3 py-1 bg-white border-0 shadow outline-none"
        type="text"
        name="novoRegistro"
        id="novoRegistro"
        v-model="novoRegistro"
        placeholder="Nome do Registro"
        @keydown.enter.prevent
        @keyup.enter.prevent="criarRegistro"
      />

      <input
        class="px-3 py-1 bg-white border-l font-black"
        type="button"
        value="+"
        @click.prevent="criarRegistro"
      />
    </form>

    <ul class="flex flex-wrap justify-center w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <li
        class="bg-white w-28 min-h-8 p-1 align-text-bottom border"
        v-for="registro in listaDeRegistros"
        :key="registro.nomeRegistro"
      >
        <router-link
          class="block capitalize"
          :to="`/controle/${registro.nomeRegistro.replace('/', '-')}`"
        >
          {{ registro.nomeRegistro.replace("-", "/") }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      novoRegistro: "",
    };
  },
  methods: {
    ...mapActions(["adicionarRegistro"]),
    validarRegistro() {
      let valido = false;

      if (this.novoRegistro.trim() != "") {
        valido = true;
      }
      this.listaDeRegistros.forEach((item) => {
        if (item.nomeRegistro == this.novoRegistro) {
          valido = false;
        }
      });
      return valido;
    },
    criarRegistro() {
      if (this.validarRegistro()) {
        const registro = {
          nomeRegistro: this.novoRegistro.replace("/", "-"),
          conteudoRegistro: {
            débitos: [],
            créditos: [],
          },
        };
        this.adicionarRegistro(registro);
        this.novoRegistro = "";
      } else {
        window.alert("Nome de registro invalido");
      }
    },
  },
  computed: {
    ...mapState(["listaDeRegistros"]),
  },
};
</script>
