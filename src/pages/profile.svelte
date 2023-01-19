<script>
	import { activeUser } from '../state.ts';
    import { url } from '@roxi/routify'
    console.log($activeUser)
</script>
    
<div>
    {#if Object.keys($activeUser).length === 0}
        <p>You are not logged in. Log in <a href={$url('./login')}> here</a> to view your profile.</p>
    {:else}
        <p>Username: {$activeUser.username}</p>
        <p>Password: {$activeUser.password}</p>
    {/if}    
</div>  