<script>
	let redditData = fetch('https://us-central1-hen-in-a-bullhouse.cloudfunctions.net/reddit-searchDD')
		 .then(res => res.json());
		 
	let threadList = [];

	let stockTickerList = [];
	
	const stockTicker = new RegExp(/[A-Z]{1,4}/g)

</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	{#await redditData}
		<span>Awaiting some data.</span>
	{:then threadList}
		<ul>
		{#each threadList.slice(0, 10) as thread}
			<li>
				<h2>{thread.title}</h2>
				<h2>{thread.selftext_html.match(stockTicker) }</h2>
				<span>{@html thread.selftext_html}</span>
				<h2>{thread.author}</h2>
				<h2>{thread.ups}:{thread.downs}, {thread.upvote_ratio}</h2>
			</li>
		{:else}
			<li>
				<span>no threads!</span>
			</li>
		{/each}
		</ul>
	{/await}
</main>