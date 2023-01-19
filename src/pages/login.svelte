<script>
	import { profiles, activeUser } from '../state.ts';
	import { url, goto } from '@roxi/routify'
    let username;
    let password;
	let loggedIn = false;
	let incorrectLogin = false;

	function logIn(myUsername, myPassword) {
		$profiles.forEach(profile => {
            if (myUsername == profile.username && myPassword == profile.password) {
                $activeUser = profile;
				loggedIn = true;
				$goto('./profile')
            }
        })
		if (!loggedIn) {
			incorrectLogin = true	;
			username = null;
        	password = null;
		}

	};	
</script>

<div class="container">
    <input class="input" bind:value={username} placeholder="username">
    <input class="input" bind:value={password} placeholder="password">
    <button class="button" on:click={logIn(username, password)}>Log In</button>
	{#if incorrectLogin}
		<p>Your username or password were incorrect. Try again or sign up <a href={$url('./signup')}> here.</a></p>
	{:else}
		<p>If you dont have an account you can sign up <a href={$url('./signup')}> here.</a></p>
	{/if}
</div>


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
