<template>
  <div>
    <h1>Planification de repas</h1>
    <table>
      <thead>
      <tr>
        <th>Jour</th>
        <th>Recettes</th>
        <th>Nombre d'invités</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(meal, index) in meals" :key="index">
        <td>{{ meal.day }}</td>
        <td>
          <select v-model="meal.recettes" multiple>
            <option v-for="recette in recettes" :key="recette.id_recette">{{ recette.nom_recette }}</option>
          </select>
        </td>
        <td>
          <input type="number" v-model="meal.ingredients">
        </td>
      </tr>
      </tbody>
    </table>
    <button @click="savePlan">Enregistrer le plan</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Planification",
  data() {
    return {
      recettes: [], // liste de toutes les recettes disponibles
      meals: [ // tableau de 7 objets représentant les repas de la semaine
        { day: 'Lundi', recettes: [], ingredients: 1 },
        { day: 'Mardi', recettes: [], ingredients: 1 },
        { day: 'Mercredi', recettes: [], ingredients: 1 },
        { day: 'Jeudi', recettes: [], ingredients: 1 },
        { day: 'Vendredi', recettes: [], ingredients: 1 },
        { day: 'Samedi', recettes: [], ingredients: 1 },
        { day: 'Dimanche', recettes: [], ingredients: 1 },
      ]
    };
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
    savePlan() {
      const plan = {
        monday: {
          recettes: this.meals[0].recettes,
          ingredients: this.meals[0].ingredients
        },
        tuesday: {
          recettes: this.meals[1].recettes,
          ingredients: this.meals[1].ingredients
        },
        wednesday: {
          recettes: this.meals[2].recettes,
          ingredients: this.meals[2].ingredients
        },
        thursday: {
          recettes: this.meals[3].recettes,
          ingredients: this.meals[3].ingredients
        },
        friday: {
          recettes: this.meals[4].recettes,
          ingredients: this.meals[4].ingredients
        },
        saturday: {
          recettes: this.meals[5].recettes,
          ingredients: this.meals[5].ingredients
        },
        sunday: {
          recettes: this.meals[6].recettes,
          ingredients: this.meals[6].ingredients
        }
      };

      axios.post('http://localhost:8080/api/marmiton/', plan)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  mounted() {
    this.fetchRecipes();
  }
}
</script>
<style scoped>

</style>