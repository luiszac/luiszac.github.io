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
//logout();
observar();


function writeUserData(name, description, image, uid) {
  firebase.database().ref('contenido/'+ uid).set({
    nombre: name,
    descripcion: description,
    imagen : image
  });
}


function agregar(){

var user = firebase.auth().currentUser;
var uid = user.uid;

var name = document.getElementById("nombre_contenido").value;
var description = document.getElementById("descripcion_contenido").value;
var image= document.getElementById("imagen_contenido").value;

writeUserData(name,description,image,uid);


 }



//Funcion para detectar eventos en la base de datos
//Referencia a nuestra base de datos contenido/
var contenidoref = firebase.database().ref('contenido/');
contenidoref.on('value', function(snapshot) {
  //SE ejecuta al iniciar
  console.log("Se ha actualizado la base de datos");
});


//Lectura de datos
function leer(){

//Del usuario que este actualmente logea, obtenemos su user id
var curso = document.getElementById("curso_nombre").value;
var userId = firebase.auth().currentUser.uid;
//Se muestra al darle clic
//Mostramos todos los datos del usuario
return firebase.database().ref('/contenido/' + curso).once('value').then(function(snapshot) {
  var nombre = snapshot.val().nombre;
  var descripcion = snapshot.val().descripcion;
  var imagen = snapshot.val().imagen;
  //Mostrando datos 

  var contenido_total= `
  <p>${nombre}</p> 
  <p>${descripcion}</p>
  <img src="${imagen}"></img>

  `
  
  //Mostrando datos en el div "Lista_contenidos"
  document.getElementById("lista_contenidos").innerHTML =contenido_total
  // ...
});


}



// -------------------------------------
//  Storage firebase
// -------------------------------------


// Referencia a nuestro storage
var storageRef = firebase.storage().ref();


function upload(){

//Nombre del archivo que estamos subiendo
var nombre_archivo = document.getElementById('fileItem').files[0].name;

//Referencia a la ruta del archivo
var ImagesRef = storageRef.child('images/' + nombre_archivo);


var file = document.getElementById('fileItem').files[0];
ImagesRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});

}

function search(){
var nombre_archivo = document.getElementById('searched').value;
// Create a reference to the file we want to download
var starsRef = storageRef.child('images/' + nombre_archivo);

// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  console.log(url);

  var img_buscada = `
  <img src="${url}"></img>

  `

  //Mostrando datos en el div "Lista_contenidos"
  document.getElementById("busqueda").innerHTML = img_buscada

}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});


}


// -------------------------------------
//  Juntando todo en final.html
// -------------------------------------







