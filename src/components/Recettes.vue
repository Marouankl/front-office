<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">

        <h1>Afficher les Recettes </h1>
        <router-link class="btn btn-warning btn-block" to='/Ajouter'>Ajouter une recette</router-link>
        <hr><br><br>

        <div class="form-group">
          <label for="selectRecette">Sélectionner une recette :</label>
          <select class="form-control" id="selectRecette" v-model="selectedRecette">
            <option v-for="recette in recettes" :value="recette" v-bind:key="recette.id_recette">{{ recette.nom_recette }}</option>
          </select>
        </div>

        <button class="btn btn-primary" @click="afficherDetails">Afficher les détails</button>

        <br><br>
        <table class="table table-hover" v-if="detailsAffiches">
          <thead>
          <tr>
            <th scope="col">Ingrédients</th>
            <th scope="col">Étapes</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <ul>
                <li v-for="ingredient in selectedRecette.ingredients" v-bind:key="ingredient.id_ingredient">{{ ingredient.nom_ingredient }} - {{ ingredient.description_ingredient }} - {{ ingredient.unite }}- {{ ingredient.prix }} - - {{ ingredient.quantite }}</li>
              </ul>
            </td>
            <td>
              <ol>
                <li v-for="etape in selectedRecette.etapes" v-bind:key="etape.id_etape">{{ etape.description_etape }}</li>
              </ol>
            </td>
          </tr>
          <router-link class="btn btn-info" :to="{ name: 'Modifier', params: { id: selectedRecette.id_recette } }">Modifier la recette</router-link>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  name: 'Recettes',
  data() {
    return {
      recettes: [],
      selectedRecette: null,
      detailsAffiches: false
    };
  },
  mounted() {
    this.fetchRecipes();

  },
  methods: {
    fetchRecipes() {
      axios.get('http://localhost:8080/api/recettes/')
          .then(response => {
            this.recettes = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    afficherDetails() {
      this.detailsAffiches = true;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #008CBA;
  border: none;
  margin-top: 20px;
}

.btn-primary:hover {
  background-color: #006380;
}

.list-group-item {
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 16px;
}

.h2, h3 {
  color: #008CBA;
}

</style>
