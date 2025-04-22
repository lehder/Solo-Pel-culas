let = pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    } 
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    } 
});

const cargarPeliculas = async () => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ffa04fead3314d8112ac0fc0304f5896&language=es-ES&page=${pagina}`);
        console.log(respuesta);

        if(respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                  <img class="poster" src="https://image.tmdb.org/t/p/w300/${pelicula.poster_path}">
                  <h3 class="titulo">${pelicula.title}</h3>
                  <p class="descripcion">${pelicula.overview}</p>
                  <p class="fecha">${pelicula.release_date}</p>
                </div>
                
                `
            });


            document.getElementById('contenedor').innerHTML = peliculas;


        } else if(respuesta.status === 401)  {
            console.log('Pusiste la llave mal');
        } else if(respuesta.status === 404) {
            console.log('La pelicula no existe');
        } else {
            console.log('Error desconocido');
        }
        

    } catch (error) {
        console.log(error)
    }
  
}

cargarPeliculas();