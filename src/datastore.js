import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAJgkKa06tGMbJMC2GuRIQg3QSTofqPwnU",
    authDomain: "web-dev-9824a.firebaseapp.com",
    databaseURL: "https://web-dev-9824a.firebaseio.com",
    projectId: "web-dev-9824a",
    storageBucket: "web-dev-9824a.appspot.com",
    messagingSenderId: "250070827721",
    appId: "1:250070827721:web:a3294b678bb72b2106c318",
    measurementId: "G-17F9GNLS40"
  };
  firebase.initializeApp(config);

  const database = firebase.database();
  //const ourAuth = firebase.auth();

export function addCocktail(cocktailName, cocktailRecipe, cocktailImage) {
  const cocktails = firebase.database().ref('Cocktails/');
  cocktails.push({
      cocktailName,
      cocktailRecipe,
      cocktailImage
    });
  };

export function fetchCocktails(callback) {
  database.ref('Cocktails/').on('value', (snapshot) => {
    const allCocktails = snapshot.val();
    callback(allCocktails);
  });
} 

export function removeCocktail(cocktailID) {
  database.ref('Cocktails/').child(cocktailID).remove();

}

export function updateName(id, newName) {
  const updates = {cocktailName: newName};
  var whereToUpdate = database.ref('Cocktails/' + id);
  whereToUpdate.update(updates);
}

