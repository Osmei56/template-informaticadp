<template>
   <v-container
      id="ListarArticulos"
      fluid
      tag="section"
   >
      <v-btn to="/articulos/crear" fab dark color="#FF5252"><v-icon>mdi-plus</v-icon></v-btn>
      <base-material-card
         icon="mdi-clipboard-text"
         title="Personal"
         class="px-5 py-3"
      >
         <v-simple-table 
            fixed-header
            class="elevation-3"
         >
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
               </tr>
            </thead>

            <tbody>
               <tr v-for="articulo in articulos" :key="articulo.id">
                  <td>{{articulo.id}}</td>
                  <td>{{articulo.descripcion}}</td>
                  <td>{{articulo.precio.toFixed(2)}}</td>
                  <td>{{articulo.stock}}</td>
                  <td>
                  <v-btn :to="{ name: 'EditarArticulo', params: {id: articulo.id} }" fab small color="light-blue"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn @click.stop="dialog=true" @click="id = articulo.id" fab small color="orange darken-4"><v-icon>mdi-delete</v-icon></v-btn>
                  </td>
               </tr>
            </tbody>

         </v-simple-table>
    
      </base-material-card>
      
      <!-- Ventana de diálogo para eliminar registros -->
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">Cancelar</v-btn>
            <v-btn @click="confirmarBorrado(id)" color="error">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   </v-container>
</template>

<script>
  let url = 'http://localhost:5001/api/articulos/'
  import axios from 'axios'

  export default {
    name: 'ListarArticulos',
    mounted() {
      this.obtenerArticulos()
    },
    data() {
      return {
        dialog: false,
        articulos: null
      }
    },
    methods: {
      obtenerArticulos() {
        axios.get(url)
        .then( response => {
          this.articulos = response.data
        })
        .catch( error => {
          console.log(error)
        })
      },
      confirmarBorrado(id) {
        axios.delete(url+id)
        .then(() => {
          this.obtenerArticulos()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
