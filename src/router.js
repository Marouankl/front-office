import { createRouter, createWebHistory } from 'vue-router';
import Planification from'./components/Planification';
import Modifier from'./components/Modifier';
import Recettes from './components/Recettes.vue';
import Ajouter from './components/Ajouter.vue';
import AjouterIngredient from "@/components/AjouterIngredient";
const routes = [
    {
        path: '/',
        name: 'Recettes',
        component: Recettes
    },
    {
        path: '/Ajouter',
        name: 'Ajouter',
        component: Ajouter
    },
    {
        path: '/Modifier/:id',
        name: 'Modifier',
        component: Modifier
    },
    {
        path: '/Planification',
        name: 'Planification',
        component: Planification
    },
    {
        path: '/Ajouter/AjouterIngredient',
        name: 'AjouterIngredient',
        component: AjouterIngredient
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;