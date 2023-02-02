<script>
	import { investments, activeUser } from '../../state.ts';
    import { params, goto } from '@roxi/routify';
    const index = $investments.findIndex(investment => investment.id = $params.id);
    const investment = $investments[index];

    function deleteInvestment() {
        if (confirm("Are you sure you want to delete this investment?")) {
            $investments.splice(index, 1);
            $goto('/investments')
        } 
    }

</script>    



<div class="investment-info-container">
    <h5>Title: {investment.title}</h5>
    <p>Description: {investment.description}</p>
    <p>Requested dollar amount: {investment.amount}</p>
    <p>Payout Percentage: {investment.payout}</p>
    <p>Creator: {investment.creator.username}</p>
    {#if $activeUser.username == investment.creator.username}
        <button class="investment-detail-edit-btn" on:click={$goto(`/investments/edit/${investment.id}`)}>Edit</button>
        <button class="investment-detail-delete-btn" on:click={deleteInvestment}>Delete</button>
    {/if}
</div>


<style>
    .investment-info-container {
        width: 100%;
        text-align: center;
    }

    .investment-detail-edit-btn:hover, .investment-detail-delete-btn:hover {
        cursor: pointer;
    }

    

</style>    





