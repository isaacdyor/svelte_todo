<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 2em;
    font-weight: bold;
    margin: 20px 0;
  }

  .new-todo {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  .input {
    flex: 1;
    font-size: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
  }

  .button {
    font-size: 1em;
    padding: 10px;
    border: none;
    border-radius: 0 5px 5px 0;
    background-color: #00b8d4;
    color: white;
    cursor: pointer;
  }

  .button:hover {
    background-color: #0052cc;
  }

  .todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .todo input[type="checkbox"] {
    margin-right: 10px;
  }

  .todo p {
    flex: 1;
    font-size: 1em;
    margin: 0;
    /* text-decoration: {task.complete ? 'line-through' : 'none'}; */
  }

  .todo button {
    font-size: 0.8em;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #00b8d4;
    color: white;
    cursor: pointer;
  }

  .todo button:hover {
    background-color: #0052cc;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .filter-button {
    font-size: 1em;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #00b8d4;
    color: white;
    cursor: pointer;
    margin: 0 5px;
  }
</style>	

<script>
	function filter(condition) {
    activeButton = condition;
    updateTasks();
  }

  function updateTasks() {
    if (activeButton === "all") {
      activeTasks = tasks;
    } else if (activeButton === "active") {
      activeTasks = tasks.filter(task => !task.complete);
    } else {
      activeTasks = tasks.filter(task => task.complete);
    }
  }

  function setCompletion(task) {
    task.complete = !task.complete;
    updateTasks();
  }

  function deleteTask(task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    updateTasks();
  }

  class Todo {
    constructor(value) {
      this.value = value;
      this.complete = false;
      this.id = tasks.length;
    }
  }
</script>

<div class="container">
  <h1 class="title">Todo list</h1>
  <div class="new-todo">
    <input class="input" bind:value={task}>
    <button class="button" on:click={() => addTask(new Todo(task))}>Add</button>
  </div>

  <div class="button-container">
    <button class:active={activeButton === "all"} on:click={() => filter("all")} class="filter-button">All</button>
    <button class:active={activeButton === "active"} on:click={() => filter("active")} class="filter-button">Active</button>
    <button class:active={activeButton === "completed"} on:click={() => filter("completed")} class="filter-button">Completed</button>
  </div>

  {#each activeTasks as task}
    <div class="todo">
      <input type="checkbox" on:change={() => setCompletion(task)} checked={task.complete} />
      <p>{task.value}</p>
      <button on:click={() => deleteTask(task)} class="button">Delete</button>
    </div>
  {/each}
</div>
