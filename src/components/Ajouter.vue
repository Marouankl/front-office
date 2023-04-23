<template>
  <div>
    <h1>Ajouter un ingrédient à une recette</h1>

    <h1>Créer une recette</h1>
    <form @submit.prevent="createRecipe">
      <label>Nom de la recette:</label>
      <input type="text" v-model="nom_recette"><br><br>
      <label>Description:</label>
      <textarea v-model="description_recette"></textarea><br><br>
      <label>Temps de préparation:</label>
      <input type="text" v-model="temps_preparation"><br><br>
      <label>Temps de cuisson:</label>
      <input type="text" v-model="temps_cuisson"><br><br>
      <label>Difficulté:</label>
      <input type="text" v-model="difficulte"><br><br>
      <label>Nombre de personnes:</label>
      <input type="text" v-model="nb_personnes"><br><br>

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
import axios from "axios";
export default {
  data() {
    return {
      nom_ingredient: "",
      description_ingredient: "",
      unite: "",
      prix: "",
      nom_recette: "",
      description_recette: "",
      temps_preparation: "",
      temps_cuisson: "",
      difficulte: "",
      nb_personnes: "",
      etapes: [],
    };
  },
  methods: {
    createRecipe() {
      // Envoyer la requête POST pour créer la recette
      axios
          .post("http://localhost:8081/api/recettes/create", {
            nom_recette: this.nom_recette,
            description_recette: this.description_recette,
            temps_preparation: this.temps_preparation,
            temps_cuisson: this.temps_cuisson,
            difficulte: this.difficulte,
            nb_personnes: this.nb_personnes,
          })
          .then((response) => {
            console.log(response.data);

            // Récupérer l'ID de la recette créée
            const id_recette = response.data.id;

            // Rediriger l'utilisateur vers la page d'ajout d'ingrédients
            this.$router.push({
              name: "AjouterIngredient",
              params: { id_recette },
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addEmptyEtape() {
      this.etapes.push({
        description: "",
      });
    },
    removeEtape(index) {
      this.etapes.splice(index, 1);
    },
  },
};
</script>
<style>

</style>