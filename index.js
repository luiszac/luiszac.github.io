firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("register_div").style.display = "none";
    document.getElementById("contenido").style.display = "block";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("register_div").style.display = "block";
    document.getElementById("contenido").style.display= "none";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error :  " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}

function register(){

  var email = document.getElementById("email_new").value;
  var password = document.getElementById("password_new").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error :  " + errorMessage);
  // ...
});

  
}

function observar(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('Usuario logeado');
    //aparece();
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    //window.alert("Existe usuario");
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

}

function aparece(){
  var contenido = document.getElementById("contenido");
  contenido.innerHTML = `
  <p>Bienvenido!</p>
  <img src="https://www.comunidadxbox.com/wp-content/imagenes/img_8696.jpg">

  `;

}
logout();
observar();