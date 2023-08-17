let opcionBusqueda = document.getElementById("selector");
let resultados = document.getElementById("listaResultados");
let elementoInput = document.getElementById("inputBusqueda");
let boton = document.getElementById("botonEnviar");
let noResultados = document.getElementById("noResultados");

let buscador = "peliculas.json";

opcionBusqueda.addEventListener("change", function () {
    buscador = opcionBusqueda.value;
    resultados.innerHTML = "";
    noResultados.style.display = "none"; // Oculta el mensaje al cambiar la opción
    let evento = new CustomEvent("aviso");
    opcionBusqueda.dispatchEvent(evento);
})

boton.addEventListener("click", buscar);

function buscar() {
    resultados.innerHTML = "";
    noResultados.style.display = "none"; // Oculta el mensaje al realizar una nueva búsqueda

    fetch(buscador)
        .then(res => res.json())
        .then(function (salida) {
            let hayResultados = false;

            for (let item of salida.data) {
                if (item.nombre.toUpperCase().includes(elementoInput.value.toUpperCase())) {
                    let parrafo = document.createElement("p");
                    parrafo.id = item.nombre;
                    parrafo.innerHTML = item.sinopsis;
                    parrafo.style.display = "none";

                    let lista = document.createElement("li");
                    lista.innerHTML = item.nombre;
                    lista.addEventListener("mouseover", function () {
                        let p = document.getElementById(item.nombre);
                        p.style.display = "block";
                    });
                    lista.addEventListener("mouseout", function () {
                        let p = document.getElementById(item.nombre);
                        p.style.display = "none";
                    });

                    lista.appendChild(parrafo);
                    resultados.appendChild(lista);
                    hayResultados = true;
                }
            }

            if (!hayResultados) {
                noResultados.style.display = "block"; // Muestra el mensaje si no hay resultados
            }
        })
        .catch(function (error) {
            alert("Error al cargar el archivo JSON: " + error);
        });
}

elementoInput.addEventListener("keydown", verificar);

function verificar(event) {
    if ((event.keyCode < 65 || event.keyCode > 90) && event.keyCode !== 8 && event.keyCode !== 32) {
        event.preventDefault();
    }
}
