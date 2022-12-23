<script>
  let task = "";
  let activeTasks = [];
	let completedTasks = [];
	let activeButton = "all";

  function addTask(myTask) {
    activeTasks.push(myTask);
		activeTasks = activeTasks;
    task = "";
  }

	class Todo {
		constructor(value, complete, id) {
			this.value = value;
			this.id = activeTasks.length + completedTasks.length;
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
		<button class:active={activeButton === "all"} on:click={() => activeButton = "all"} class="filter-button">All</button>
		<button class:active={activeButton === "active"} on:click={() => activeButton = "active"} class="filter-button">Active</button>
		<button class:active={activeButton === "completed"} on:click={() => activeButton = "completed"} class="filter-button">Completed</button>
	</div>
	{#if activeButton == "all"}
		{#each activeTasks.concat(completedTasks) as task}
			<div>
				<label>
					<input type="checkbox" bind:checked={task.complete}/>
					{task.value}
				</label>
			</div>
		{:else}
			<p>No todos!</p>	
		{/each}
	{:else if activeButton == "active"}
		{#each activeTasks as task}
			<div>
				<label>
					<input type="checkbox"/>
					{task.value}
				</label>
			</div>
		{:else}
			<p>No todos!</p>	
		{/each}
	{:else}
		{#each completedTasks as task}
			<div>
				<label>
					<input type="checkbox" bind:checked={task.complete}/>
					{task.value}
				</label>
			</div>
		{:else}
			<p>No todos!</p>	
		{/each}
	{/if}

 

  
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

	.new-todo {
		padding: 20px;
	}

</style>