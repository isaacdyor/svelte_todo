<script>
	import { activeUser, investments, profiles } from '../../state.ts';
    import { url, goto } from '@roxi/routify'
    
    const filteredInvestments = $investments.filter(investment => investment.creator.username == $activeUser.username);
    const index = $profiles.findIndex(profile => profile.username = $activeUser.username);

    function deleteInvestment() {
        if (confirm("Are you sure you want to delete your profile?")) {
            $investments = $investments.filter(investment => investment.creator.username != $activeUser.username);
            $profiles.splice(index, 1);
            $activeUser = {}
            $goto('/signup')
        } 
    }
    
</script>
    
<div>
    {#if Object.keys($activeUser).length === 0}
        <p>You are not logged in. Log in <a href={$url('../login')}> here</a> to view your profile.</p>
    {:else}
        <div class="login-info">
            <h4>Username: {$activeUser.username}</h4>
            <h4>Password: {$activeUser.password}</h4>
            <button on:click={$goto('/profile/edit')}>Edit</button>
            <button on:click={deleteInvestment}>Delete Account</button>
        </div>
        {#each filteredInvestments as investment}
            <div class="investment-container" on:click={$goto(`/investments/${investment.id}`)}>        
                <h5>Title: {investment.title}</h5>
                <p>Description: {investment.description}</p>
                <p>Requested dollar amount: {investment.amount}</p>
                <p>Creator: {investment.creator.username}</p>
            </div>
        {/each}
    {/if}    
</div>  

<style>
    .investment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid lightgray;
        border-radius: 5px;
        cursor: pointer;
    }

    .login-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>