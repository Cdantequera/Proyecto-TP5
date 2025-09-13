// Lógica para mostrar y ocultar las descripciones en el sidebar
const descripcionDiv = document.getElementById('descripcion-ejercicio');
const descripciones = {
    1: `<h4>Números Mágicos</h4><p>Adivina un número aleatorio entre 1 y 100. El juego te dará pistas si tu número es mayor o menor al número mágico.</p>`,
    2: `<h4>Generaciones</h4><p>Crea un objeto 'Persona' con tus datos. La aplicación te dirá a qué generación perteneces y si eres mayor de edad.</p>`,
    3: `<h4>Lista de Tareas</h4><p>Una aplicación simple para añadir y eliminar tareas. Ideal para organizar tu día a día.</p>`,
    4: `<h4>Reloj Digital</h4><p>Un reloj en tiempo real que muestra la fecha y hora actual, actualizándose cada segundo.</p>`,
    5: `<h4>Cronómetro</h4><p>Un cronómetro clásico con funciones de iniciar, pausar y resetear el tiempo. Perfecto para medir intervalos.</p>`,
    6: `<h4>Temporizador</h4><p>Establece un tiempo en segundos y mira cómo la cuenta regresiva avanza. Incluye controles de inicio, pausa y reinicio.</p>`
};

const mostrarDescripcion = (numero) => {
    descripcionDiv.innerHTML = descripciones[numero];
};

const limpiarDescripcion = () => {
    descripcionDiv.innerHTML = '<p>Pasa el cursor sobre un botón de ejercicio para ver su descripción aquí.</p>';
};


//Logica para mopstrar y ocultar los ejercicios
const mostrarEjercicio = (numero) => {
    // Ocultamos todos los contenedores de ejercicios
    const todosLosEjercicios = document.getElementsByClassName('contenedor-ejercicio');
    for (let i = 0; i < todosLosEjercicios.length; i++) {
        todosLosEjercicios[i].style.display = 'none';
    }

    // Mostramos solo el seleccionado
    const ejercicioSeleccionado = document.getElementById(`ejercicio${numero}`);
    if (ejercicioSeleccionado) {
        ejercicioSeleccionado.style.display = 'block';
    }

    // Lógica para iniciar/detener el reloj al cambiar de vista
    if (numero === 4) {
        iniciarReloj();
    } else {
        detenerReloj();
    }
};


//1. ejercicio adivina el numero

let numeroMagico;
const botonComenzar = document.getElementById('botonComenzarJuego');
const botonEnviar = document.getElementById('botonEnviarNumero');
const divJuego = document.getElementById('juego');
const inputUsuario = document.getElementById('inputNumeroUsuario');

botonComenzar.onclick = () => {
    // Generamos un número aleatorio entre 1 y 100
    numeroMagico = Math.floor(Math.random() * 100) + 1;
    divJuego.style.display = 'block';
    inputUsuario.value = ''; // Limpiamos el input al empezar
    inputUsuario.focus(); // Ponemos el foco en el input
    alert('¡El juego ha comenzado! Adivina el número.');
};

botonEnviar.onclick = () => {
    const numeroDelUsuario = parseInt(inputUsuario.value);

    if (isNaN(numeroDelUsuario)) {
        alert('Por favor, ingresa un número válido.');
    } else if (numeroDelUsuario === numeroMagico) {
        alert('¡Felicidades! Adivinaste el número mágico. 🎉');
        divJuego.style.display = 'none';
    } else if (numeroDelUsuario > numeroMagico) {
        alert('El número que ingresaste es MAYOR al número mágico.');
    } else {
        alert('El número que ingresaste es MENOR al número mágico.');
    }
    inputUsuario.focus();
};


//2. ejercicio clase persona

class Persona {
    constructor(nombre, edad, dni, sexo, peso, altura, anioNacimiento) {
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
        this.anioNacimiento = anioNacimiento;
    }

    mostrarGeneracion() {
        const anio = this.anioNacimiento;
        let generacion = '';
        let rasgo = '';

        if (anio >= 1930 && anio <= 1948) {
            generacion = 'Silent Generation';
            rasgo = 'la Austeridad';
        } else if (anio >= 1949 && anio <= 1968) {
            generacion = 'Baby Boomer';
            rasgo = 'la Ambición';
        } else if (anio >= 1969 && anio <= 1980) {
            generacion = 'Generación X';
            rasgo = 'la Obsesión por el éxito';
        } else if (anio >= 1981 && anio <= 1993) {
            generacion = 'Generación Y (Millennials)';
            rasgo = 'la Frustración';
        } else if (anio >= 1994 && anio <= 2010) {
            generacion = 'Generación Z';
            rasgo = 'la Irreverencia';
        } else if (anio > 2010) {
            generacion = 'Generación Alpha';
            rasgo = 'ser Nativos Digitales';
        } else {
            generacion = "una generación no clasificada en este rango";
            rasgo = "un rasgo único";
        }

        return `Pertenece a la ${generacion}. Su rasgo característico es ${rasgo}.`;
    }

    esMayorDeEdad = () => (this.edad >= 18) ?
        `${this.nombre} es mayor de edad.` :
        `${this.nombre} no es mayor de edad.`;

    mostrarDatos() {
        return `--- Información de la Persona ---\n` +
            `Nombre: ${this.nombre}\n` +
            `Edad: ${this.edad} años\n` +
            `DNI: ${this.dni}\n` +
            `Sexo: ${this.sexo === 'H' ? 'Hombre' : 'Mujer'}\n` +
            `Peso: ${this.peso} kg\n` +
            `Altura: ${this.altura} cm\n` +
            `Año de Nacimiento: ${this.anioNacimiento}`;
    }
}

const crearPersonaDesdeFormulario = () => {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const dni = document.getElementById('dni').value;
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value);
    const anioNacimiento = parseInt(document.getElementById('anioNacimiento').value);

    if (!nombre || isNaN(edad) || !dni || isNaN(peso) || isNaN(altura) || isNaN(anioNacimiento)) {
        alert('Por favor, completa todos los campos correctamente.');
        return null;
    }

    return new Persona(nombre, edad, dni, sexo, peso, altura, anioNacimiento);
};

document.getElementById('btnMostrarGeneracion').onclick = () => {
    const persona = crearPersonaDesdeFormulario();
    if (persona) alert(persona.mostrarGeneracion());
};

document.getElementById('btnEsMayorDeEdad').onclick = () => {
    const persona = crearPersonaDesdeFormulario();
    if (persona) alert(persona.esMayorDeEdad());
};

document.getElementById('btnMostrarDatos').onclick = () => {
    const persona = crearPersonaDesdeFormulario();
    if (persona) alert(persona.mostrarDatos());
};


//3. ejercicio lista de tareas

const botonAgregar = document.getElementById('botonAgregarTarea');
const inputTarea = document.getElementById('inputTarea');
const lista = document.getElementById('listaDeTareas');

botonAgregar.onclick = () => {
    const textoTarea = inputTarea.value.trim();

    if (textoTarea !== '') {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-white';
        nuevaTarea.textContent = textoTarea;

        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-danger btn-sm';
        botonEliminar.textContent = 'Eliminar';

        // Al hacer clic, eliminamos el elemento 'li' (nuevaTarea) directamente
        botonEliminar.onclick = () => nuevaTarea.remove();

        nuevaTarea.appendChild(botonEliminar);
        lista.appendChild(nuevaTarea);

        inputTarea.value = ''; // Limpiamos el input
    } else {
        alert('Por favor, escribe una tarea.');
    }
    inputTarea.focus();
};


//4. ejercicio reloj digital

let intervaloDelReloj;
const relojDiv = document.getElementById('reloj');

const actualizarReloj = () => {
    const fecha = new Date();
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dia = fecha.getDate();
    const diaSemana = diasSemana[fecha.getDay()];
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    // Usamos operador ternario para añadir el cero inicial
    const horasFormato = horas < 10 ? '0' + horas : horas;
    const minutosFormato = minutos < 10 ? '0' + minutos : minutos;
    const segundosFormato = segundos < 10 ? '0' + segundos : segundos;

    // Usamos template literals para una mejor legibilidad
    relojDiv.innerHTML = `${diaSemana}, ${dia} de ${mes} de ${anio}<br>${horasFormato}:${minutosFormato}:${segundosFormato}`;
};

const iniciarReloj = () => {
    if (!intervaloDelReloj) {
        actualizarReloj(); // Llama una vez para que no haya delay
        intervaloDelReloj = setInterval(actualizarReloj, 1000);
    }
};

const detenerReloj = () => {
    clearInterval(intervaloDelReloj);
    intervaloDelReloj = null;
};


//5. ejercicio cronometro

const cronometroDisplay = document.getElementById('cronometro');
const btnIniciarCrono = document.getElementById('btnIniciarCrono');
const btnPausarCrono = document.getElementById('btnPausarCrono');
const btnResetCrono = document.getElementById('btnResetCrono');

let horas = 0,
    minutos = 0,
    segundos = 0;
let intervaloCrono;

const correrCronometro = () => {
    segundos++;
    if (segundos === 60) {
        segundos = 0;
        minutos++;
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
    }

    const h = horas < 10 ? '0' + horas : horas;
    const m = minutos < 10 ? '0' + minutos : minutos;
    const s = segundos < 10 ? '0' + segundos : segundos;

    cronometroDisplay.textContent = `${h}:${m}:${s}`;
};

btnIniciarCrono.onclick = () => {
    if (!intervaloCrono) {
        intervaloCrono = setInterval(correrCronometro, 1000);
    }
};

btnPausarCrono.onclick = () => {
    clearInterval(intervaloCrono);
    intervaloCrono = null;
};

btnResetCrono.onclick = () => {
    clearInterval(intervaloCrono);
    intervaloCrono = null;
    horas = 0;
    minutos = 0;
    segundos = 0;
    cronometroDisplay.textContent = '00:00:00';
};


//6. ejercicio temporizador

const temporizadorDisplay = document.getElementById('temporizador');
const inputTiempo = document.getElementById('inputTiempo');
const btnIniciarTemp = document.getElementById('btnIniciarTemp');
const btnPausarTemp = document.getElementById('btnPausarTemp');
const btnResetTemp = document.getElementById('btnResetTemp');

let segundosTotales;
let intervaloTemp;
let tiempoInicial = 0;

const correrTemporizador = () => {
    if (segundosTotales > 0) {
        segundosTotales--;

        const min = Math.floor(segundosTotales / 60);
        const seg = segundosTotales % 60;

        const minFormato = min < 10 ? '0' + min : min;
        const segFormato = seg < 10 ? '0' + seg : seg;

        temporizadorDisplay.textContent = `${minFormato}:${segFormato}`;
    } else {
        clearInterval(intervaloTemp);
        intervaloTemp = null;
        temporizadorDisplay.textContent = '00:00';
        alert('¡Tiempo terminado! ⏳');
    }
};

btnIniciarTemp.onclick = () => {
    if (!intervaloTemp) {
        if (!segundosTotales || segundosTotales === 0) {
            tiempoInicial = parseInt(inputTiempo.value);
            if (isNaN(tiempoInicial) || tiempoInicial <= 0) {
                return alert("Ingresa un número de segundos válido.");
            }
            segundosTotales = tiempoInicial;
        }
        intervaloTemp = setInterval(correrTemporizador, 1000);
    }
};

btnPausarTemp.onclick = () => {
    clearInterval(intervaloTemp);
    intervaloTemp = null;
};

btnResetTemp.onclick = () => {
    clearInterval(intervaloTemp);
    intervaloTemp = null;
    segundosTotales = 0;
    temporizadorDisplay.textContent = '00:00';
    inputTiempo.value = '';
};

// Inicia mostrando el primer ejercicio por defecto
window.onload = () => {
    mostrarEjercicio(1);
};