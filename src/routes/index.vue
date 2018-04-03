<template>
	<div>
		<Header></Header>
		<section id="landing">
			<div class="fbox content">
				<h1>Geode</h1>
				<h1 class="tagline">Find local gems</h1>
				<p class="bigger-text">
					A mobile application that sends you deals and sales for local businesses near you. Sign up to find relevant deals near you!</p>
				<br>
				<br>
				<a href="#" class="nav_about">
					<p>
						<b>Learn More</b>
					</p>
				</a>
				<div class="badges">
					<img class="badge" src="../assets/google-play-badge.svg" />
					<img class="badge" src="../assets/black_app_store.svg" />
				</div>
			</div>
			<div class="fbox">
				<img class="home-gfx" src="../assets/placeholder.png" />
			</div>
		</section>
	</div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'Index',
	components: {
		Header
	}
}
</script>

<style scoped></style>
