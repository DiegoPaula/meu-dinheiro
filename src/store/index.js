import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listaDeRegistros:
      JSON.parse(localStorage.getItem("listaDeRegistros")) || [],
  },
  mutations: {
    acrescentarRegistro: (state, registro) => {
      state.listaDeRegistros.push(registro);
      localStorage.setItem(
        "listaDeRegistros",
        JSON.stringify(state.listaDeRegistros)
      );
    },
    acrescentarEntrada: (state, entrada) => {
      if (entrada.entrada.categoriaEntrada == "débito") {
        state.listaDeRegistros[
          entrada.indexRegistro
        ].conteudoRegistro.débitos.push(entrada.entrada);
      } else if (entrada.entrada.categoriaEntrada == "crédito") {
        state.listaDeRegistros[
          entrada.indexRegistro
        ].conteudoRegistro.créditos.push(entrada.entrada);
      }
      localStorage.setItem(
        "listaDeRegistros",
        JSON.stringify(state.listaDeRegistros)
      );
    },
    retirarRegistro: (state, indexRegistro) => {
      state.listaDeRegistros.splice(indexRegistro, 1);
      localStorage.setItem(
        "listaDeRegistros",
        JSON.stringify(state.listaDeRegistros)
      );
    },
    retirarEntrada: (state, { indexRegistro, nome }) => {
      const registro = state.listaDeRegistros[indexRegistro].conteudoRegistro;
      registro.créditos.forEach((entrada) => {
        if (entrada.nomeEntrada == nome) {
          registro.créditos.splice(registro.créditos.indexOf(entrada), 1);
        }
      });
      registro.débitos.forEach((entrada) => {
        if (entrada.nomeEntrada == nome) {
          registro.débitos.splice(registro.débitos.indexOf(entrada), 1);
        }
      });
      localStorage.setItem(
        "listaDeRegistros",
        JSON.stringify(state.listaDeRegistros)
      );
    },
  },
  actions: {
    adicionarRegistro: ({ commit }, registro) => {
      commit("acrescentarRegistro", registro);
    },
    adicionarEntrada: ({ commit }, entrada) => {
      commit("acrescentarEntrada", entrada);
    },
    removerRegistro: ({ commit }, indexRegistro) => {
      commit("retirarRegistro", indexRegistro);
    },
    removerEntrada: ({ commit }, { indexRegistro, nome }) => {
      commit("retirarEntrada", { indexRegistro, nome });
    },
  },
  modules: {},
});
