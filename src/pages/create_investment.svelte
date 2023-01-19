<script>
	import { investments, activeUser } from '../state.ts';
    import { url, goto } from '@roxi/routify'

    let title;
    let description;
    let amount;
    let empty = false;

	function create() {
        if (title == null || description == null || amount == null) {
            empty = true;

            title = null;
            description = null;
            amount = null;
        }
        else {
            $investments = [...$investments, {
                title: title,
                description: description,
                amount: amount,
                creator: $activeUser,
                id: $investments.length,
            }];

            $goto(`./investments/${$investments.length}`)
        } 

	};
	
</script>

{#if Object.keys($activeUser).length === 0}
    <p>You are not logged in. Log in <a href={$url('./login')}> here</a> to view your profile.</p>
{:else}
    <div class="container">
        <h4>Title of your investment</h4>
        <input class="input" bind:value={title} placeholder="Title">
        <h4>Description of your investment</h4>
        <textarea class="input" bind:value={description} placeholder="Description" cols="50" rows="10"></textarea>
        <h4>Amount of money you are looking for</h4>
        <input class="input" bind:value={amount} placeholder="Dollar amount" type="number" min="0">
        <button class="button" on:click={create}>Create</button>
        {#if empty}
            <p>Do not leave any of these fields blank.</p>
        {/if}
    </div>
{/if}




<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
	.input {
		margin: 10px;
		padding: 10px;
		border-radius: 4px;
		border: 1px solid #ccc;
        width: 410px;
	}
	.button {
		margin: 10px;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		border: 1px solid #007bff;
		border-radius: 4px;
		background-color: #007bff;
		color: #fff;
		cursor: pointer;
	}
</style>
