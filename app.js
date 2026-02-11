/*
    * TaskMaster - A simple todo list application
    *
    * This JavaScript file contains the functionality for the TaskMaster app.
    * It allows users to create, mark complete, and delete tasks.
*/

// Variables globales para status de la app
let tasks = [];
var currentFilter = 'all';

// Variables globales para elementos del DOM
var taskForm;
var taskInput;
var taskPriority;
var taskDate;
var taskList;
var itemsLeft;
var filterButtons;

/*
    * Función para actualizar el título del documento con el número de tareas
*/
function updateDocumentTitle(){
    document.title = `TaskMaster - ${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'}`;
}

/*
 * Función para actualizar el contador de tareas restantes
*/
function updateTaskCount(){
    itemsLeft.textContent = tasks.length;
    updateDocumentTitle();
}

/*
 * Validación de la descrición del formulario
 * @param {string} description - The task description to validate
 * @returns {boolean} - Whether the description is valid
*/
function isValidTaskDescription(description){
    // TODO: Return true if description is not empty and has at least 3 characters
    // Return false otherwise
    return description.trim().length >= 3;
}

/*
  * Creates a new task object
  * @param {string} description - The task description
  * @param {string} priority - The task priority
  * @param {string} date - The due date
  * @returns {Object} - The new task object
*/
function createTaskObject(description, priority, date){
    return {
        id: Date.now(), // Unique ID based on timestamp
        description: description,
        priority: priority,
        dueDate: date,
        completed: false
    }
}

/*
 * Función para manejar el envío del formulario de tareas
 * Crea una nueva tarea y la agrega a la lista de tareas
 */
function handleFormSubmit(e){
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página

    //Obtener data
    var description = taskInput.value.trim();
    var priority = taskPriority.value;
    var dueDate = taskDate.value;

    // Validar la descripción de la tarea
    if(!isValidTaskDescription(description)){
        alert('La descripción de la tarea debe tener al menos 3 caracteres.');
        taskInput.focus(); // Enfoca el campo de entrada para que el usuario pueda corregirlo fácilmente
        return;
    }

    // Crear un nuevo objeto de tarea
    var newTask = createTaskObject(description, priority, dueDate);
    // Agregar la nueva tarea a la lista de tareas
    tasks.push(newTask);
  
    // Actualiza el contador de tareas restantes
    updateTaskCount();
    console.log('Nueva tarea creada:', newTask);
    console.log('Total de tareas:', tasks.length);

    // Resetea el formulario
    taskForm.reset();
}

/*
    * Función para inicializar la aplicación
    * Configura los elementos del DOM y los eventos necesarios
*/
function initApp(){
    console.log('Inicializando TaskMaster...');
     
    // TODO: Add element selection code here
    // getElementById es más rápido que otros porque los navegadores tienen un index de IDs, lo que permite una búsqueda rápida. Además, los IDs son únicos en el DOM, lo que garantiza que solo se seleccione un elemento.
    taskForm = document.getElementById('task-form');
    taskInput = document.getElementById('task-input');
    taskPriority = document.getElementById('task-priority');
    taskDate = document.getElementById('task-date');
    taskList = document.getElementById('task-list');
    itemsLeft = document.getElementById('items-left');

    // querySelectorAll es más flexible porque permite seleccionar elementos usando cualquier selector CSS, pero puede ser más lento que getElementById, especialmente si el selector es complejo o si hay muchos elementos que coinciden con el selector.    
    // La diferencia entre querySelectorAll y querySelector es que querySelectorAll devuelve una NodeList de todos los elementos que coinciden con el selector, mientras que querySelector devuelve solo el primer elemento que coincide. En este caso, como queremos seleccionar todos los botones de filtro, usamos querySelectorAll.
    filterButtons = document.querySelectorAll('.filter-btn');

    // Añademos eventos listener
    taskForm.addEventListener('submit', handleFormSubmit);
  
    // Actualiza el título del documento con el número de tareas
    updateDocumentTitle();

    console.log('App TaskMaster iniciada');
}

// Inicializa cuando cargue DOM, esto espera a que el contenido del documento esté completamente cargado antes de ejecutar la función initApp, asegurando que todos los elementos del DOM estén disponibles para su manipulación.
// Esta parte es MUY importante.
document.addEventListener('DOMContentLoaded', initApp);