<script>
  let task = "";
	let editTask = "";
	let tasks = [];
	let activeTasks = [];
	let activeButton = "all";
  function addTask(myTask) {
    tasks.push(myTask);
		tasks = tasks;
    task = "";
		updateTasks();
  }
	function filter(condition) {
		activeButton = condition;
		updateTasks();
  }
	function updateTasks() {
		if (activeButton == "all") {
			activeTasks = tasks
		} else if (activeButton == "active") {
			activeTasks = tasks.filter(task => task.complete == false)
		} else {
			activeTasks = tasks.filter(task => task.complete == true)
		}	
		console.log(activeTasks)	
	}
	function setCompletion(task) {
		task.complete = !task.complete
		updateTasks();
	}
	function deleteTask(task) {
		let index = tasks.indexOf(task);
		console.log(index);
		tasks.splice(index, 1);
		task.selected = "unselected";
		updateTasks();
	}
	function cancel(task) {
		task.value = task.temp;
		task.selected = "unselected";
		updateTasks();
	}
	class Todo {
		constructor(value) {
			this.value = value;
			this.temp = value;
			this.complete = false;
			this.id = tasks.length;
			this.selected = "unselected";
		}
	}
</script>

<div class="container">
  <h1 class="title">Todo list</h1>
	<div class="new-todo">
		<input class="input" bind:value={task}>
		<button class="button" on:click={addTask(new Todo(task))}>Add</button>
</div>

<div class="button-container">
	<button class:active={activeButton === "all"} on:click={() => filter("all")} class="filter-button">All</button>
	<button class:active={activeButton === "active"} on:click={() => filter("active")} class="filter-button">Active</button>
	<button class:active={activeButton === "completed"} on:click={() => filter("completed")} class="filter-button">Completed</button>
</div>

{#key activeTasks}
	{#each activeTasks as task}
	<div>
		<label>
			{#if task.selected == "unselected"}
				<input type="checkbox" on:change={() => setCompletion(task)} checked = {task.complete}/>
				{task.value} 
				<br>
				<button on:click={() => task.selected = "edit"} class="edit-button">Edit</button>
				<button on:click={() => task.selected = "delete"} class="delete-button">Delete</button>
			{:else if task.selected == "edit"}
				<input class="input" bind:value={task.value} >
				<br>
				<button on:click={() => task.selected = "unselected"} class="edit-button">Save</button>
				<button on:click={() => cancel(task)} class="delete-button">Cancel</button>
			{:else}
				<input type="checkbox" on:change={() => setCompletion(task)} checked = {task.complete}/>
				{task.value} 
				<br>
				<p>Are you sure you want to delete this todo?</p>
				<br>
				<button on:click={() => deleteTask(task)} class="edit-button">Delete</button>
				<button on:click={() => task.selected = "unselected"} class="delete-button">Cancel</button>
			{/if}


		</label>
	</div>
	{:else}
	<p>No todos!</p>	
	{/each}
{/key}

</div>



<style>
  .container {
    text-align: center;
    width: 50%;
    border: 3px solid #0000ff;
    transform: translate(50%, 10%)
  }
  .input {
    padding: 0.75rem 1.25rem;
  }
  .button {
    border: none;
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    cursor: pointer;
  }
  input[type="checkbox"] {
    width: 1.2em;
    height: 1.2	em;
  }
	label {
    margin-left: 0.5em;
    font-size: 1.2em;
  }
	.button-container {
		text-align: center;
  }
  .filter-button {
    color: #007bff;
    border: 2px solid #007bff;
    background-color: white;
  }
  .active {
    background-color: #007bff;
    color: white;
  }
	.edit-button {
    color: #007bff;
    border: 2px solid #007bff;
    background-color: white;
  }
	.delete-button {
    background-color: #007bff;
		border: 2px solid #007bff;
    color: white;
  }
	.new-todo {
		padding: 20px;
	}
</style>