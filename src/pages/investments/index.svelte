<script>
	import { investments } from '../../state.ts';
    import { goto } from '@roxi/routify';
</script>
<div class="investment-list-container">
    <h1 class="centered-title">Investments</h1>
    {#if $investments.length == 0}
        <p>There are currently no investments</p>
    {:else}
        {#each $investments as investment}
            <div class="investment-container" on:click={$goto(`/investments/${investment.id}`)}>
                
                <div class="investment-info-container">
                    <h5 class="investment-title">Title: {investment.title}</h5>
                    <p class="investment-description">Description: {investment.description}</p>
                    <p class="investment-amount">Requested dollar amount: {investment.amount}</p>
                    <p class="investment-amount">Payout percentage: {investment.payout}</p>
                    <p class="investment-creator">Creator: {investment.creator.username}</p>
                </div>
            </div>
        {/each}
    {/if}
</div>
<style>
    .investment-list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .centered-title {
        text-align: center;
        margin-bottom: 20px;
    }

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

    .investment-info-container {
        width: 100%;
        text-align: center;
    }

    .investment-title {
        font-weight: bold;
    }

    .investment-description {
        margin-bottom: 0;
    }

    .investment-amount {
        margin-bottom: 0;
    }

    .investment-creator {
        margin-bottom: 0;
    }
</style>    