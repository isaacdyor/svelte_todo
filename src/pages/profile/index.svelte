<script>
	import { activeUser, investments, profiles } from '../../state.ts';
    import { url, goto } from '@roxi/routify'

    let withdraw = false;
    let deposit = false;
    let withdrawValue = 0;
    let depositValue = 0;
    let invalidWithdrawal  = false;
    
    const filteredInvestments = $investments.filter(investment => investment.creator.username == $activeUser.username);
    const index = $profiles.findIndex(profile => profile.username = $activeUser.username);

    function toggleWithdraw() {
        withdraw = !withdraw;
        deposit = false;

    }

    function toggleDeposit() {
        deposit = !deposit;
        withdraw = false;
    }

    function withdrawFunction() {
        if (withdrawValue <= $activeUser.balance) {
            $activeUser.balance -= withdrawValue
        } else {
            invalidWithdrawal = true;
        }
    }

    function depositFunction() {
        $activeUser.balance += depositValue
    }

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
            <h2>Login Info</h2>
            <p>Username: {$activeUser.username}</p>
            <p>Password: {$activeUser.password}</p>
            <div class="change-account">
                <button on:click={$goto('/profile/edit')}>Edit</button>
                <button on:click={deleteInvestment}>Delete Account</button>        
            </div>
        </div> 
        <br>
        <div class="balance-info">
            <h4>Balance: {$activeUser.balance}</h4>
            <div class="button-container">
                {#if $activeUser.balance > 0} 
                    <button on:click={toggleWithdraw} class="left-button">Withdraw</button>
                {/if}
                <button on:click={toggleDeposit} class="right-button">Deposit</button>
            </div>
            <div class="balance-input">
                {#if $activeUser.balance > 0} 
                    {#if withdraw}
                        <input class="input" bind:value={withdrawValue} placeholder="Withdraw" type="number">
                        <button class="blue-button" on:click={withdrawFunction}>Submit</button>
                    {/if}
                {/if}
            
                {#if deposit}
                    <input class="input" bind:value={depositValue} placeholder="Deposit" type="number">
                    <button class="blue-button" on:click={depositFunction}>Submit</button>
                {/if} 
            </div>

            {#if invalidWithdrawal}
                <p>You can only withdraw how much money you have in your balance</p>
            {/if}
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
    .balance-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .button-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .balance-info {
        display: flex;
        align-items: center;
    }
    .change-account {
        display: flex;
        align-items: center;
    }
    .input {
        height: 40px;
        padding: 10px;
        margin: 0;
        flex-grow: 1;
    }
    .blue-button {
        height: 40px;
        padding: 10px 20px;
        background-color: #0000ff;
        color: #fff;
        border: none;
        border-radius: 4px;
        margin: 0;
    }
    button {
        width: auto;
        padding: 10px 20px;
        margin: 10px 10px;
    }
</style>