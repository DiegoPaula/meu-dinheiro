<template>
  <div class="text-center font-black rounded-xl bg-white bg-opacity-40 pb-20">
    <h1 class="text-6xl leading-normal capitalize h-20">
      {{ registro.nomeRegistro.replace("-", "/") }}
    </h1>

    <form class="my-10 flex justify-center items-center">
      <input
        class="px-3 py-1 h-8 w-60 bg-white border-0 shadow outline-none"
        placeholder="Nome da Entrada"
        v-model.lazy="entradaForm.nomeEntrada"
        type="text"
        name="nomeEntrada"
        id="nomeEntrada"
        @keyup.enter="selectNext($event.target)"
      />

      <input
        class="px-3 py-1 h-8 w-28 bg-white border-l shadow outline-none"
        placeholder="Valor"
        v-model.lazy="entradaForm.valorEntrada"
        type="number"
        name="valorEntrada"
        id="valorEntrada"
        @keyup.enter="criarEntrada($event.target)"
      />

      <input
        class="px-3 py-1 h-8 bg-white border-l shadow outline-none"
        type="button"
        value="+"
        @click="criarEntrada($event.target)"
      />
    </form>

    <table
      v-show="
        total(registro.conteudoRegistro.débitos) > 0 ||
        total(registro.conteudoRegistro.créditos) > 0
      "
      class="w-2/3 h-auto flex flex-wrap justify-center mx-auto"
    >
      <td class="w-1/2 border-2 pb-9 min-h-full relative">
        <tr class="flex justify-center bg-white text-red-500">
          <th>Débito</th>
        </tr>
        <tr class="flex justify-center bg-white">
          <th class="w-1/2">Nome</th>
          <th class="w-1/2">Valor</th>
        </tr>
        <tr
          class="flex justify-center border-b"
          v-for="item in registro.conteudoRegistro.débitos"
          :key="item.nomeEntrada"
          @click="excluirEntrada(item.nomeEntrada)"
          title="Clique para excluir"
        >
          <td class="w-1/2 capitalize overflow-hidden">
            {{ item.nomeEntrada }}
          </td>
          <td class="w-1/2 overflow-hidden">
            {{ formatter.format(Number(item.valorEntrada)) }}
          </td>
        </tr>
        <tr class="flex h-8 absolute m-0.5 bottom-0 right-0 left-0 bg-white">
          <td class="w-full text-2xl text-red-500">
            {{ formatter.format(total(registro.conteudoRegistro.débitos)) }}
          </td>
        </tr>
      </td>
      <td class="w-1/2 border-2 pb-9 relative">
        <tr class="flex justify-center bg-white text-green-500">
          <th>Crédito</th>
        </tr>
        <tr class="flex justify-center bg-white">
          <th class="w-1/2">Nome</th>
          <th class="w-1/2">Valor</th>
        </tr>
        <tr
          class="flex justify-center border-b"
          v-for="item in registro.conteudoRegistro.créditos"
          :key="item.nomeEntrada"
          @click="excluirEntrada(item.nomeEntrada)"
          title="Clique para excluir"
        >
          <td class="w-1/2 capitalize overflow-hidden">
            {{ item.nomeEntrada }}
          </td>
          <td class="w-1/2 overflow-hidden">
            {{ formatter.format(Number(item.valorEntrada)) }}
          </td>
        </tr>
        <tr class="flex h-8 absolute m-0.5 bottom-0 right-0 left-0 bg-white">
          <td class="w-full text-2xl text-green-500">
            {{ formatter.format(total(registro.conteudoRegistro.créditos)) }}
          </td>
        </tr>
      </td>
      <tr
        v-show="
          total(registro.conteudoRegistro.débitos) > 0 &&
          total(registro.conteudoRegistro.créditos) > 0
        "
        class="flex justify-center bg-white w-full text-2xl"
        :class="[
          total(registro.conteudoRegistro.débitos) >
          total(registro.conteudoRegistro.créditos)
            ? 'text-red-500'
            : 'text-green-500',
        ]"
      >
        {{
          formatter.format(saldo())
        }}
      </tr>
    </table>

    <router-link
      :to="'/controle'"
      class="
        flex
        justify-center
        items-center
        fixed
        bottom-5
        text-2xl text-white
        w-8
        h-8
        rounded-full
      "
    >
      <button
        @click="removerRegistro(indexRegistro)"
        title="Excluir Registro"
        class="bg-red-600 border border-red-700 w-8 h-8 rounded-full"
      >
        X
      </button>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      registro: {},
      formatter: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      indexRegistro: 0,
      entradaForm: {
        nomeEntrada: "",
        valorEntrada: "",
      },
    };
  },
  methods: {
    ...mapActions(["adicionarEntrada", "removerRegistro", "removerEntrada"]),
    localizarRegistro(lista, nome) {
      let index = 0;
      lista.forEach((item) => {
        if (item.nomeRegistro == nome) {
          this.registro = item;
          this.indexRegistro = index;
        } else {
          index++;
        }
      });
    },
    validarEntrada() {
      const registro =
        this.listaDeRegistros[this.indexRegistro].conteudoRegistro;
      let valido = true;

      if (
        this.entradaForm.valorEntrada == "" ||
        this.entradaForm.nomeEntrada == ""
      ) {
        valido = false;
      }
      registro.débitos.forEach((item) => {
        if (item.nomeEntrada == this.entradaForm.nomeEntrada) {
          valido = false;
        }
      });
      registro.créditos.forEach((item) => {
        if (item.nomeEntrada == this.entradaForm.nomeEntrada) {
          valido = false;
        }
      });
      return valido;
    },
    criarEntrada(target) {
      if (this.validarEntrada()) {
        const categoria =
          this.entradaForm.valorEntrada >= 0 ? "crédito" : "débito";
        this.entradaForm.valorEntrada =
          this.entradaForm.valorEntrada >= 0
            ? this.entradaForm.valorEntrada
            : this.entradaForm.valorEntrada * -1;
        const entrada = {
          indexRegistro: this.indexRegistro,
          entrada: {
            nomeEntrada: this.entradaForm.nomeEntrada,
            valorEntrada: this.entradaForm.valorEntrada,
            categoriaEntrada: categoria,
          },
        };
        this.adicionarEntrada(entrada);
      } else {
        window.alert("Nome de entrada Invalida");
      }
      target.parentElement.firstChild.focus();
      this.entradaForm = {
        nomeEntrada: "",
        valorEntrada: "",
      };
    },
    excluirEntrada(nome) {
      const indexRegistro = this.indexRegistro;
      const excluir = {
        indexRegistro,
        nome,
      };
      this.removerEntrada(excluir);
    },
    total(lista) {
      let total = 0;
      lista.forEach((item) => {
        total += Number(item.valorEntrada);
      });
      return total;
    },
    saldo() {
      const crédito = this.total(this.registro.conteudoRegistro.créditos);
      const débito = this.total(this.registro.conteudoRegistro.débitos);
      const saldo =
        crédito - débito < 0 ? (crédito - débito) * -1 : crédito - débito;
      return saldo;
    },
    selectNext(target) {
      if (target.value !== "") {
        target.nextElementSibling.focus();
      }
    },
  },
  computed: {
    ...mapState(["listaDeRegistros"]),
  },
  mounted() {
    const nomeRegistro = this.$route.params.nomeRegistro;
    this.localizarRegistro(this.listaDeRegistros, nomeRegistro);
  },
};
</script>
<style></style>
