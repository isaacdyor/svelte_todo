<script>
	import { profiles, activeUser } from '../state.ts';
    import { url, goto } from '@roxi/routify'

    let username;
    let password;
    let unique = true;
    let empty = false;

	function signUp() {
        unique = true;
        uniqueUser(username);
        if (username == null || password == null) {
            console.log("hello")
            empty = true;
        }
        else if (unique) {
            $profiles = [...$profiles, {
                username: username,
                password: password,
            }];
            $activeUser = {
                username: username,
                password: password,
            }
            $goto('./profile')
        } 
        username = null;
        password = null;
	};

    function uniqueUser() {
        $profiles.forEach(profile => {
            if (username == profile.username) {
                unique = false;
            }
        })
    }
	
</script>

<div class="container">
    <input class="input" bind:value={username} placeholder="username">
    <input class="input" bind:value={password} placeholder="password">
    <button class="button" on:click={signUp}>Sign Up</button>
    {#if empty}
        <p>Your username or password cannot be empty.</p>
    {:else if !unique}
        <p>There is already an account under that username. If it is yours press <a href={$url('./login')}>here</a> to login</p>
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
