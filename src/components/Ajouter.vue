<template>
  <div>
    <h1>Ajouter un ingrédient à une recette</h1>
    <form @submit.prevent="addIngredient">
      <label>Nom de l'ingrédient :</label>
      <input type="text" v-model="ingredientName">
      <button type="submit">Ajouter</button>
    </form>
    <h1>Créer une recette</h1>
    <form @submit.prevent="createRecipe">
      <label>Nom de la recette:</label>
      <input type="text" v-model="recipeName"><br><br>
      <label>Description:</label>
      <textarea v-model="description"></textarea><br><br>
      <label>Temps de préparation:</label>
      <input type="text" v-model="tempsPreparation"><br><br>
      <label>Temps de cuisson:</label>
      <input type="text" v-model="tempsCuisson"><br><br>
      <label>Difficulté:</label>
      <input type="text" v-model="difficulte"><br><br>
      <label>Nombre de personnes:</label>
      <input type="text" v-model="nbPersonnes"><br><br>

      <h2>Ingrédients</h2>
      <div v-for="(ingredient, index) in ingredients" :key="index">
        <label>Nom de l'ingrédient :</label>
        <input type="text" v-model="ingredients[index].nom">
        <button type="button" @click="removeIngredient(index)">Supprimer</button>
      </div>
      <button type="button" @click="addEmptyIngredient">Ajouter un ingrédient</button><br><br>

      <h2>Étapes de la recette</h2>
      <div v-for="(etape, index) in etapes" :key="index">
        <label>Étape :</label>
        <textarea v-model="etapes[index].description"></textarea>
        <button type="button" @click="removeEtape(index)">Supprimer</button>
      </div>
      <button type="button" @click="addEmptyEtape">Ajouter une étape</button><br><br>

      <button type="submit">Créer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ingredientName: '',
      recipeName: '',
      description: '',
      tempsPreparation: '',
      tempsCuisson: '',
      difficulte: '',
      nbPersonnes: '',
      ingredients: [],
      etapes: [],
    };
  },
  methods: {
    addIngredient() {
      axios.post(`http://localhost:8080/api/recettes/:id_recette/ingredients/add`, {
        nom: this.ingredientName,
      })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    },
    createRecipe() {
      axios.post('http://localhost:8080/api/recettes/create', {
        nom: this.recipeName,
        description: this.description,
        temps_preparation: this.tempsPreparation,
        temps_cuisson: this.tempsCuisson,
        difficulte: this.difficulte,
        nb_personnes: this.nbPersonnes,
      })
          .then(response => {
            console.log(response.data);
            const recipeId = response.data.id;
            const ingredients = []; // initialize empty array to store ingredients
            for (let i = 0; i < this.ingredients.length; i++) {
              ingredients.push({
                nom: this.ingredients[i].nom,
                quantite: this.ingredients[i].quantite,
              });
            }
            axios.post(`http://localhost:8080/api/recettes/${recipeId}/ingredients/add`, ingredients)
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  console.log(error);
                });
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>
<style>

</style>