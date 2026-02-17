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
var formError;
var clearButton;

/*
    * Función para actualizar el título del documento con el número de tareas
*/
function updateDocumentTitle(){
    const incompleted = tasks.filter(i => !i.completed);
    document.title = `TaskMaster - ${incompleted.length} ${incompleted.length === 1 ? 'tarea' : 'tareas'}`;
}

/*
 * Función para actualizar el contador de tareas restantes
*/
function updateTaskCount(){
    const incompleted = tasks.filter(i => !i.completed);
    itemsLeft.textContent = incompleted.length;
    updateDocumentTitle();
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
 * Agrega una tarea
 * @param {string} description
 * @param {string} priority
 * @param {string} date
*/
function addTask(description, priority, date){
    // Validamos
    var errors = validateTask(description, date);
    if(errors.length > 0){
        formError.textContent = errors.join('. ');
        formError.style.display = 'block';
        return false;
    }

    resetFormWithCleanup();

    var newTask = createTaskObject(description, priority, date);

    tasks.push(newTask);
    
    renderTasks();

    // Show confirmation
    console.log('Tarea añadida con éxito!');

    return true;
}

/**
 * Filter tasks based on current filter
 * @returns {Array} - The filtered tasks
 */
function getFilteredTasks() {
    // Your code here: Return different arrays based on the currentFilter value
    // - If currentFilter is 'active', return only incomplete tasks
    // - If currentFilter is 'completed', return only completed tasks
    // - Otherwise, return all tasks

    // Hints:
    // - Use a conditional (if/else) to check the value of currentFilter
    // - Create a new array to hold the filtered tasks
    // - Loop through all tasks and add the matching ones to your array
    var filteredTasks = [];
    if(currentFilter === 'all'){
        filteredTasks = tasks;
    }
    else if(currentFilter === 'active'){
        filteredTasks = tasks.filter(t => !t.completed);
    }
    else if(currentFilter === 'completed'){
        filteredTasks = tasks.filter(t => t.completed);
    }

    return filteredTasks;
}

/*
 * Renderiza un único elemento de tarea
 * @param {Object} taskData
 * @returns {HTMLElement} - Tarea creada
*/
function renderTaskElement(taskData){
    var li = document.createElement('li');
    li.className = 'task-item';

    // Add data-id attribute to connect element with task data
    // Your code here
    li.setAttribute('data-id', taskData.id);

    // TODO: Add the priority class to the list item
    // Example: task-item-high, task-item-medium, or task-item-low
    // Hint: use classList.add('task-item-' + taskData.priority)
    li.classList.add('task-item-' + taskData.priority);

    if(taskData.completed){
        li.classList.add('task-completed');
    }

    // TODO: Create and add the checkbox
    // It should be an input element with:
    // - type: 'checkbox'
    // - className: 'task-checkbox'
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'task-checkbox';
    cb.checked = taskData.completed;
    li.appendChild(cb);
    // TODO: Create and add the content container
    // It should be a div with className 'task-content'
    // Inside it should have:
    // - A paragraph with className 'task-text' and textContent from taskData.description
    // - A small element with className 'task-details' with priority and date information
    var content = document.createElement('div');
    content.className = 'task-content';
    var p = document.createElement('p');
    p.className = 'task-text';
    p.textContent = taskData.description;
    var small = document.createElement('small');
    small.className = 'task-details';
    small.textContent = `Priority: ${taskData.priority}, Date: ${taskData.dueDate}`;
    content.appendChild(p);
    content.appendChild(small);
    li.appendChild(content);
    // For now, we'll just add a placeholder for the delete button
    // We'll implement its functionality in a future lab
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);
    return li; 
}

/*
 * Renderiza todas las tareas en el DOM
*/
function renderTasks(){
    // Limpia la lista de tareas antes de renderizar
    taskList.innerHTML = '';    

    // Your code here: Get filtered tasks using your new function
    var filteredTask = getFilteredTasks();
    // Your code here: Check if we have tasks to display
    // If no tasks match the filter, show an appropriate message
    // Otherwise, render each filtered task
    filteredTask.forEach(function(t) {
        var taskElement = renderTaskElement(t);
        taskList.appendChild(taskElement);
    });

    // Update task count
    updateTaskCount();
}

/*
 * Formatea la fecha
*/
function getFormattedToday(){
    var today = new Date();

    // Obten el anho, mes y dia
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if(month<10){
        month = '0' + month;
    }
    if(day<10){
        day = '0' + day;
    }

    console.log(month);

    return year + '-' + month + '-' + day;
}

/*
 * Validación de la tarea para asegurar que cumple con los requerimientos
 * @param {string} description
 * @param {string} date
 * @returns {Array}
*/
function validateTask(description, date){
    var errors = [];

    if(!description){
        errors.push('Se requiere una descripción de la tarea');
    } else if(description.length < 3){
        errors.push('La descripción debe tener al menos 3 caracteres.');
    }

    if(!date){
        errors.push('Fecha de vencimiento es requerida');
    } else{
        var today = getFormattedToday();
        if(date < today){
            errors.push('La fecha de vencimiento no puede ser anterior a hoy');
        }
    }

    return errors;
}

/*
 * Reseteamos limpiando todo
*/
function resetFormWithCleanup(){
    taskForm.reset();
    taskDate.value = getFormattedToday();

    // Limpiamos los errores
    formError.textContent = '';
    formError.style.display = 'none';

    taskInput.focus();
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

    // Agregamos la tarea
    var success = addTask(description, priority, dueDate);
}

/*
 * Manejar filtros al hacer click en los botones de filtro
 * @param {Event} e - The click event
*/
function handleFilterClick(e){
    // Revisa si un boton de filtro fue clickeado
    if(e.target.classList.contains('filter-btn')){
        // Obten el tipo de filtro del atributo data-filter del botón clickeado
        var filter = e.target.getAttribute('data-filter');

        // Actualiza la variable global currentFilter con el nuevo filtro
        currentFilter = filter;

        // TODO: Update the active class on filter buttons
        // Remove 'active' class from all buttons
        // Add 'active' class to the clicked button
        // Hint: Use a loop with classList.remove() and classList.add()
        filterButtons.forEach(function(button){
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        
        renderTasks();
        console.log('Filter changed to:', filter);
    }
}

/*
 * Encuentra la tarea por ID
 * @param {number} taskId - ID a buscar
 * @returns {Object|null} - Tarea encontrada o nulo
*/
function findTaskById(taskId){
    for(var i=0; i<tasks.length; i++){
        if(tasks[i].id === taskId){
            return tasks[i];
        }
    }

    return null;
}

/*
 * Alterna el estado de la tarea
 * @param {number} taskId - Id de la tarea
*/ 
function toggleTaskComplete(taskId){
    var task = findTaskById(taskId);

    if(task){
        //Alterna el estado
        task.completed = !task.completed;

        console.log(task.completed ? 'Tarea completada':'Tarea incompleta');

        renderTasks();
    }
}

/*
 * Quita una tarea
 * @param {number} taskId - Remover el ID de la tarea
*/
function removeTask(taskId){
    var newTasks = [];
    for(var i=0; i<tasks.length; i++){
        if(tasks[i].id !== taskId){
            newTasks.push(tasks[i]);
        }
    }

    tasks = newTasks;

    // Log the change
    console.log('Task removed!');

    renderTasks();
}


/*
 * Maneja interacción con la lista de las tareas
 * @param {Event} e - Evento de click
*/
function handleTaskListClick(e){
    console.log('Click a task list:', e.target);

    //Encuentra tarea más cercana
    var taskItem = e.target;
    while(taskItem && !taskItem.classList.contains('task-item')){
        taskItem = taskItem.parentElement;
    }

    // Si no hay item returna
    if(!taskItem) return;

    // Obten ID de la tarea
    var taskId = parseInt(taskItem.getAttribute('data-id'));
    console.log('ID clickeado: ', taskId);

    // TODO: Implement element type detection
    // 1. Add code to detect what type of element was clicked
    // 2. Display a message in the console indicating whether the user clicked:
    //    - A checkbox
    //    - A delete button
    //    - The task content area
    // Hint: Use e.target and check its className or other properties
 
    // Your element detection code here:
    if(e.target.classList.contains('task-checkbox')){
        console.log('Es un checkbox');
        //Checkeado
        toggleTaskComplete(taskId);
    }
    else if(e.target.classList.contains('delete-btn')){
        console.log('Es un delete');
        // Lanza un mensaje de confirmación
        if(confirm('¿Estás seguro que quieres eliminar la tarea?')){
            removeTask(taskId);
        }
    }
    else if(e.target.classList.contains('task-content')){
        console.log('Es un task content');
    }
}
/**
 * Clear all completed tasks
 */
function handleClearCompleted() {
    // Your code here: Implement the logic to remove all completed tasks

    // Steps to implement:
    // 1. Check if there are any completed tasks - if not, alert the user and exit
    var completedTasks = tasks.filter(t => t.completed);
    if(completedTasks.length == 0){
        alert('No hay tareas completadas.');
    }
    // 2. Ask for confirmation before removing tasks
    // 3. If confirmed, filter out the completed tasks
    else{
        if(confirm('¿Estás seguro de limpiar las tareas completadas?')){
            completedTasks.forEach(t => removeTask(t.id));
            renderTasks();
        }
    }
    // 4. Update the tasks array and re-render

    // Hints:
    // - Use a loop to check for completed tasks
    // - Use the confirm() function to ask for user confirmation
    // - Create a new array with only incomplete tasks
    // - Remember to re-render the tasks after updating the array
}

/**
 * Setup all event listeners for the application
 */
function setupEventListeners() {
    // Your code here: Add event listeners for each interactive element
    // Remember to include:
    // - Form submission
    // - Task list clicks
    // - Filter button clicks
    // - Clear completed button click

    // Añademos eventos listener
    taskForm.addEventListener('submit', handleFormSubmit);

    // Se añade al nav la escucha de clicks para manejar los filtros porque los botones de filtro están dentro del nav
    document.querySelector('nav').addEventListener('click', handleFilterClick);

    taskList.addEventListener('click', handleTaskListClick);

    clearButton.addEventListener('click', handleClearCompleted);

    console.log('All event listeners initialized');
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

    formError = document.getElementById('form-error');

    clearButton = document.getElementById('clear-completed-btn');

    // querySelectorAll es más flexible porque permite seleccionar elementos usando cualquier selector CSS, pero puede ser más lento que getElementById, especialmente si el selector es complejo o si hay muchos elementos que coinciden con el selector.    
    // La diferencia entre querySelectorAll y querySelector es que querySelectorAll devuelve una NodeList de todos los elementos que coinciden con el selector, mientras que querySelector devuelve solo el primer elemento que coincide. En este caso, como queremos seleccionar todos los botones de filtro, usamos querySelectorAll.
    filterButtons = document.querySelectorAll('.filter-btn');

    taskDate.value = getFormattedToday();

    setupEventListeners();

    // Renderiza las tareas iniciales (si hay alguna)
    renderTasks();
  
    // Actualiza el título del documento con el número de tareas
    updateDocumentTitle();

    console.log('App TaskMaster iniciada');
}

// Inicializa cuando cargue DOM, esto espera a que el contenido del documento esté completamente cargado antes de ejecutar la función initApp, asegurando que todos los elementos del DOM estén disponibles para su manipulación.
// Esta parte es MUY importante.
document.addEventListener('DOMContentLoaded', initApp);