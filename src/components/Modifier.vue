<template>
  <div class="container">
    <h1>Modifier une recette</h1>
    <form @submit.prevent="updateRecipe">
      <div class="form-group">
        <label for="selectRecette">Sélectionner une recette :</label>
        <select class="form-control" id="selectRecette" v-model="selectedRecette">
          <option v-for="recette in recettes" :value="recette" v-bind:key= "recette.id_recette">{{ recette.nom_recette }}</option>
        </select>
      </div>
      <div class="form-group" v-if="selectedRecette">
        <label for="nom_recette">Nom de la recette:</label>
        <input type="text" class="form-control" id="nom_recette" v-model="selectedRecette.nom_recette">
      </div>
      <div class="form-group">
        <label for="description_recette">Description:</label>
        <textarea class="form-control" id="description_recette" v-model="selectedRecette.description_recette"></textarea>
      </div>
      <div class="form-group">
        <label>Ingrédients:</label>
        <div v-for="(ingredient, index) in selectedRecette.ingredients" v-bind:key="ingredient.id_ingredient">
          <div class="row">
            <div class="col-sm-3">
              <input type="text" class="form-control" v-model="ingredient.nom_ingredient">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" v-model="ingredient.description_ingredient">
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" v-model="ingredient.unite">
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" v-model="ingredient.prix">
            </div>
            <div class="col-sm-2">
              <input type="text" class="form-control" v-model="ingredient.quantite">
            </div>
            <div class="col-sm-12">
              <button class="btn btn-danger" @click.prevent="removeIngredient(index)">Supprimer</button>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click.prevent="addIngredient">Ajouter un ingrédient</button>
      </div>
      <div class="form-group">
        <label>Étapes:</label>
        <div v-for="(etape, index) in selectedRecette.etapes" v-bind:key="etape.id_etape">
          <div class="row">
            <div class="col-sm-11">
              <input type="text" class="form-control" v-model="etape.description_etape">
            </div>
            <div class="col-sm-1">
              <button class="btn btn-danger" @click.prevent="removeEtape(index)">Supprimer</button>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click.prevent="addEtape">Ajouter une étape</button>
      </div>
      <button type="submit" class="btn btn-primary">Mettre à jour la recette</button>
      <button class="btn btn-danger" @click.prevent="deleteRecipe">Supprimer la recette</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Modifier",
  data() {
    return {
      selectedRecette: {},
      recettes: [],
    };
  },
  methods: {
    addIngredient() {
      this.selectedRecette.ingredients.push({
        nom_ingredient: "",
        description_ingredient: "",
        unite: "",
        prix: "",
        quantite: "",
      });
    },
    removeIngredient(index) {
      this.selectedRecette.ingredients.splice(index, 1);
    },
    addEtape() {
      this.selectedRecette.etapes.push({
        description_etape: "",
      });
    },
    removeEtape(index) {
      this.selectedRecette.etapes.splice(index, 1);
    },
    updateRecipe() {
      if (this.selectedRecette && this.selectedRecette.id_recette) {
        axios
            .post(`http://localhost:8080/api/recettes/update/${this.selectedRecette.id_recette}`, this.selectedRecette)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    deleteRecipe() {
      if (this.selectedRecette && this.selectedRecette.id_recette) {
        axios
            .delete(`http://localhost:8080/api/recettes/${this.selectedRecette.id_recette}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
  },
  created() {
    axios
        .get("http://localhost:8080/api/recettes")
        .then((response) => {
          this.recettes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
};
</script>

<!-- style scoped -->
<style>
.container {
  margin: 50px auto;
  max-width: 700px;
}
</style>