const searchBtn = document.getElementById('search-btn');
const closeBtn = document.getElementById('close-btn');
const input = document.getElementById('entrada');
const logo = document.getElementById('logo-img');
const title = document.getElementById('title');
const mediaQuery = window.matchMedia('(max-width: 680px)');

function aparecerBarra() {
    if (mediaQuery.matches) {
        // Pantalla menor a 764px
        closeBtn.style.display = 'none';
        input.style.display = 'none';

        searchBtn.onclick = () => {
            logo.style.display = 'none';
            title.style.display = 'none'; 
            input.style.display = 'block';
            input.style.width = 'calc(100% - 2rem)';
            closeBtn.style.display = 'block';
        };
                // aqui ira la accion buscar
                searchBtn.addEventListener('click', function otraFuncionalidad() {
                console.log('el metodo buscar en pantallas pequeñas');
            
            });
        
            closeBtn.onclick = () => {
            logo.style.display = 'flex';
            title.style.display = 'block';
            input.style.display = 'none';
            closeBtn.style.display = 'none';
        };
    } else {
        // Pantalla mayor a 764px
        closeBtn.style.display = 'none';
        input.style.display = 'block';
        logo.style.display = 'flex';
        title.style.display = 'block';

        // Agregar otra funcionalidad al botón de buscar para pantallas mayores a 764px
        searchBtn.onclick = () => {
            
            console.log('metodo buscar en pantallas grandes');
        };
    }
}

mediaQuery.addListener(aparecerBarra);
aparecerBarra();

// funciones del contenido
 document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementsByClassName("btn-desplegar");
    for (var i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
