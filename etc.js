/* 
// -------------------------------------
//  Storage firebase
// -------------------------------------


// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name            // true
mountainsRef.fullPath === mountainImagesRef.fullPath    // false


//Nombre del archivo que estamos subiendo
document.getElementById('fileItem').files[0].name;


function upload(){

var file = document.getElementById('fileItem').files[0];
mountainsRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
 }

*/


//Función usada para escribir en 'Imagenes/' dentro de nuestro database
function writeimagesData(name, description, img_url) {
  firebase.database().ref('Imagenes/').set({
    nombre: name,
    descripcion: description,
    imag_url : image
  });
}


//Nombre del archivo que estamos subiendo
var nombre_archivo = document.getElementById('fileItem').files[0].name;
// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/' + nombre_archivo);

var file = document.getElementById('fileItem').files[0];
mountainImagesRef.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});

var starsRef = storageRef.child('images/' + nombre_archivo);


// Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Secuencia que pasa cuando se sube la imagen al storage de firebase
  console.log(url);

	var name = document.getElementById("nombre_contenido").value;
	var description = document.getElementById("descripcion_contenido").value;

	//Pasamos a guardar este url generado en nuestro database
	writeimagesData(name,description,url);

 	

  





}).catch(function(error) {
	console.log("Error");
});

