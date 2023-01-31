<script>
	import { profiles, activeUser, investments } from '../../state.ts';
    import { url, goto } from '@roxi/routify'

    let username = $activeUser.username;
    let password = $activeUser.password;
    let unique = true;
    let empty = false;

    const index = $profiles.findIndex(profile => profile.username = $activeUser.username);

	function editProfile() {
        unique = true;
        uniqueUser(username);
        if (username == null || password == null) {
            empty = true;
        }
        else if (unique) {

            $investments.forEach(investment => {
                if (investment.creator.username == $activeUser.username) {
                    investment.creator.username = username;
                }
            })

            $profiles[index] = {
                username: username,
                password: password,
            };
            $activeUser = {
                username: username,
                password: password,
            }


            
            $goto('../profile')
        } 
        username = null;
        password = null;
	};

    function uniqueUser() {
        $profiles.forEach(profile => {
            if (username == profile.username && profile.username != $activeUser.username) {
                unique = false;
            }
        })
    }
	
</script>

<div class="container">
    <input class="input" bind:value={username} placeholder="username">
    <input class="input" bind:value={password} placeholder="password">
    <button class="button" on:click={editProfile}>Edit</button>
    {#if empty}
        <p>Your username or password cannot be empty.</p>
    {:else if !unique}
        <p>There is already an account under that username. Choose another one.</p>
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
