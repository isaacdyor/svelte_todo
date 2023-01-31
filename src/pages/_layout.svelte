<script>
  import { isActive, url, goto } from '@roxi/routify'
  import { activeUser } from '../state.ts';

  // Define the links for the navbar
  const loggedOutLinks = [
    ['./index', 'Home'],
    ['./investments', 'Investments'],
    ['./login', 'Login']
  ]

  const loggedInLinks = [
    ['./index', 'Home'],
    ['./investments', 'Investments'],
    ['./create_investment', 'Create'],
    ['./profile', 'Profile'],
  ]
  
  function logout(event) {
    if (confirm("Are you sure you want to logout?")) {
      $activeUser = {};
    } else {
      event.preventDefault();
    }
  }
</script>

<style>
  
  header {
    margin: 0; /* remove space around header */
    padding: 0; /* remove space around header */
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #0000ff; /* blue color */
    color: #fff;
    padding: 0 50px; /* increased padding */
  }

  .logo {
    font-size: 30px; /* increased font size */
    font-weight: bold;
    cursor: pointer;
    margin-left: -30px; /* increased left margin */
  }

  .links {
    display: flex;
    align-items: center;
  }

  .links a {
    margin-left: 20px;
    color: #fff;
    text-decoration: none;
    font-size: 20px; /* increased font size */
  }

  .links a:hover {
    color: #eee;
  }

  .active {
    font-weight: bold;
  }
</style>

  

<!-- Add the navbar HTML -->
<header>
    <nav>
        <div class="logo" on:click={$goto('/')}>Spark Royalty</div>
        <!-- Add the nav links -->
        <div class="links">
          {#if Object.keys($activeUser).length === 0}
            {#each loggedOutLinks as [path, name]}
              <a class:active={$isActive(path)} href={$url(path)}>{name}</a>
            {/each}
          {:else}
            {#each loggedInLinks as [path, name]}
              <a class:active={$isActive(path)} href={$url(path)}>{name}</a>
            {/each}
            <a href={$url('./login')} on:click={logout}>Logout</a>
          {/if}
        </div>

          

      </nav>
</header>



  <slot />