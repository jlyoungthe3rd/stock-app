<script>
	let redditData = fetch('https://us-central1-hen-in-a-bullhouse.cloudfunctions.net/reddit-searchDD')
		 .then(res => res.json());
		 
	let threadList = [];
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
		{#each threadList as thread}
			<li>
				<p>{thread.title}</p>
				<p>{@html thread.selftext_html}</p>
			</li>
		{:else}
			<li>
				<span>no threads!</span>
			</li>
		{/each}
		</ul>
	{/await}
</main>