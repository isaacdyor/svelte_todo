<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #007bff;
  }

  .new-todo {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .input {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #007bff;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
	.button:hover {
    background-color: #0069d9;
  }

  .button-container {
    display: flex;
    margin-bottom: 1rem;
  }

  .filter-button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .filter-button.active {
    background-color: #007bff;
    color: #fff;
  }

	.edit-button,
	.delete-button {
		width: 100px;
		height: 30px;
		font-size: 1rem;
		padding: 0;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
		margin-left: 1rem;
		position: relative;
		top: -2px;
	}

  .edit-button:hover,
  .delete-button:hover {
    background-color: #ddd;
  }

	label {
		display: flex;
		align-items: center;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		line-height: 30px;
		padding: 0rem 0;
	}


	input[type="checkbox"] {
		width: 20px;
		height: 20px;
		margin-right: 0.5rem;
		position: relative;
		top: -2px;
	}

	.filter-button:not(.active):hover {
		background-color: #ddd;
	}

	.check-label {
		position: relative;
		top: -5px;
	}

</style>

<script>
  let task = "";
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
      activeTasks = tasks;
    } else if (activeButton == "active") {
      activeTasks = tasks.filter((task) => task.complete == false);
    } else {
      activeTasks = tasks.filter((task) => task.complete == true);
    }
    console.log(activeTasks);
  }

  function setCompletion(task) {
    task.complete = !task.complete;
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

  function editTask(task) {
    task.temp = task.value;
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
    <button
      class:active={activeButton === "all"}
      on:click={() => filter("all")}
      class="filter-button"
    >
      All
    </button>
    <button
      class:active={activeButton === "active"}
      on:click={() => filter("active")}
      class="filter-button"
    >
      Active
    </button>
    <button
      class:active={activeButton === "completed"}
      on:click={() => filter("completed")}
      class="filter-button"
    >
      Completed
    </button>
  </div>
	{#key activeTasks}
	{#each activeTasks as task}
		<div>
			<label>
				{#if task.selected == "unselected"}
					<input type="checkbox" on:change={() => setCompletion(task)} checked={task.complete} />
					<p class="check-label">{task.value}</p>
					<br>
					<button on:click={() => task.selected = "edit"} class="edit-button">Edit</button>
					<button on:click={() => task.selected = "delete"} class="delete-button">Delete</button>
				{:else if task.selected == "edit"}
				<input class="input" bind:value={task.value} autofocus/>
					<br>
					<button on:click={() => editTask(task)} class="edit-button">Save</button>
					<button on:click={() => cancel(task)} class="delete-button">Cancel</button>
				{:else}
					<input type="checkbox" on:change={() => setCompletion(task)} checked={task.complete} />
					{task.value}
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