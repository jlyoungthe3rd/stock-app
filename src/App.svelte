<script>
  // import csvtojson from 'csvtojson';

  // const nasdaqFilePath = './nasdaq.csv';
  // const csv = csvtojson.fromFile(nasdaqFilePath)
  //   .then((jsonObj) => {
  //     console.log(jsonObj);
  //   });

  let redditData = fetch(
    "https://us-central1-hen-in-a-bullhouse.cloudfunctions.net/reddit-searchDD"
  ).then((res) => res.json());

  let threadList = [];


  let stockTickerList = [];

  let cache = new Map();
  function handleThreadClick (thread) {
    const threadKey = thread.id;
    return function() {
      if (thread.isActive) {
        const cachedThread = cache.get(thread.id);
        const deactiveatedThread = Object.assign(cachedThread, { isActive: false });
        cache.set(threadKey, deactiveatedThread)
      } else {
        const activeThread = Object.assign(thread, { isActive: true });
        cache.set(threadKey, activeThread);
      }
      console.log("Current Cache Entries >>>>>>>>>>>>>");
      cache.forEach(entry => console.log(entry.id, entry.isActive));
      console.log(">>>>>>>>>>>>>");
    }
  }

  const stockTicker = new RegExp(/[A-Z]{1,4}/g);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .layout--left {
    grid-column: 1;
  }

  .layout--right {
    grid-column: 2 / 4;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  h2 {
  }

  ul {
    list-style-type: none;
  }

  span {
    font-size: 0.75em;
  }

  li {
    border-style: solid;
    padding: 4px;
    text-align: left;
  }

  li.active  {
    background-color: #333;
    color: #fff;
  }

  .flexContainer {
	  display: flex;
    flex-direction: column;
    max-height: 95vh;
    overflow-y: scroll;
  }



  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main> 

  <div class="layout--left">
    {#await redditData}
      <span>Awaiting some data.</span>
    {:then threadList}
      <ul class="flexContainer">
        {#each threadList.slice(0, 10) as thread}
          <li class:active={cache.get(thread.id) && cache.get(thread.id).isActive} on:click={handleThreadClick(thread)}>
            <!--  -->
            <article>
              <h3>{thread.author}</h3>
              <p>{thread.title}</p>
              <p>{thread.ups}:{thread.downs}, {thread.upvote_ratio}</p>
            </article>
            <!-- <span>{thread.selftext_html.match(stockTicker)}</span> -->
            <!-- <span>{@html thread.selftext_html}</span> -->
          </li>
        {:else}
          <li><span>no threads!</span></li>
        {/each}
      </ul>
    {/await}
  </div>
  <div class="layout--right">
    Hello world
  </div>
  
</main>
