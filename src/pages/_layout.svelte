<script>
    import { isActive, url } from '@roxi/routify'
  
    // Define the links for the navbar
    const links = [
      ['./index', 'Home'],
      ['./blog', 'Blog'],
      ['./about', 'About'],
      ['./contact', 'Contact']
    ]
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
          <!-- Add the "Tamo Movers" logo and link it to the homepage -->
          <div class="logo" on:click={() => window.location.href = '/'}>Tamo Movers</div>
          <!-- Add the nav links -->
          <div class="links">
            {#each links as [path, name]}
              <!-- Use the isActive function to apply the "active" class to the active link -->
              <a class:active={$isActive(path)} href={$url(path)}>{name}</a>
            {/each}
          </div>
        </nav>
  </header>
  
  

    <slot />
 