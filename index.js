const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const port = process.env.PORT || 8080;

let recipes = [{ 
    "id": "34",
    "name":"Yam porridge",
    "ingredients":"Yam,pepper,fish,palmoil,onions, seasoning",
    "directions": "Cut yam in to pieces and boil for 30mins,add pepper,onions, palmoil and seasoning to taste.",
},
{
    "id": "4",
    "name":"Pasta Special",
    "ingredients":"Spaghetti,groundnut oil,bell peppers,onions,minced meat,chicken and seasoning",
    "directions": "Add spaghetti to a boiling pot of water,add already cut pieces of bell peppers,onions,minced meat and seasoning to taste.Boil and fry chicken cuts,then serve side by side when ready.",
},
{
    "id": "46",
    "name":"Chicken in Sauce",
    "ingredients":"Chicken,pepper mix, groundnut oil,curry,thyme,ginger,garlic and salt(seasoning).",
    "directions": "Cut chicken into 6 pieces,boil for 15mins.Pour oil into a sauce pan,fry the boiled chicken and keep. Pour pepper mix into the oil and allow to fry for 20mins,add seasoning to taste.Add the fried chicken and let it steam for 10-15mins.Serve with a chilled glass of juice when done.",
}];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Hello World, from express');
});

// Endpoint to create a new recipe
app.post('/recipe/new', (req, res) =>{
    const recipe = req.body;
    console.log(recipe);
    recipes.push(recipe);
    res.redirect("https://zainab-recipe.netlify.app/recipe-list.html");
});

// Endpoint to get all recipes
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// Endpoint to get a recipe
app.get('/recipe/:id', (req, res) => {
    const id = req.params.id;
    for (let recipe of recipes) {
        if (recipe.id === id) {
            res.json(recipe);
            return;
        }
    }
    res.status(404).send('Recipe not found');
});


// Endpoint to update a recipe
app.post('/recipe/:id', (req, res) =>{
   const id= req.params.id;
   const newRecipe= req.body;
   for (let i = 0; i < recipes.length; i++) {
       let recipe = recipes[i]

       if (recipe.id === id) {
           recipes[i] = newRecipe;
       }
   }
   res.redirect("https://zainab-recipe.netlify.app/recipe-list.html");
});

// Endpoint to delete a recipe
app.delete('/recipe/:id', (req, res) => {
    const id = req.params.id;
    recipes = recipes.filter(i => {
        if (i.id !== id) {
            return true;
        }

        return false;
    });
    res.send('Recipe is deleted');
});

// Server
app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
})