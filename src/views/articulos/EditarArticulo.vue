<template>
  <v-container>
    <v-row>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Editar Personal</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form v-on:submit.prevent="guardarArticulo()">
          <v-text-field
            v-model="articulo.descripcion"
            label="Descripcion"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="articulo.precio"
            label="Precio"
            type="number"
            prefix="$"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="articulo.stock"
            label="Stock"
            type="number"
            outlined
            required
          >
          </v-text-field>
          <v-card-actions>
            <v-btn to="/articulos" color="blue-grey" class="mr-4"
              >Cancelar</v-btn
            >
            <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let url = "http://localhost:5001/api/articulos/";
import axios from "axios";

export default {
  name: "EditarArticulo",
  mounted() {
    this.id = this.$route.params.id
    axios.get(url + this.id)
      .then(response => {
        this.articulo = response.data[0]
      })
      .catch(error => {
        console.log(error)
      });
  },
  data() {
    return {
      id: null,
      articulo: {
        descripcion: "",
        precio: "",
        stock: ""
      }
    };
  },
  methods: {
    guardarArticulo() {
      let router = this.$router
      let params = this.articulo
      axios.put(url + this.id, params)
      .then(() => {
        router.push("/articulos")
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
