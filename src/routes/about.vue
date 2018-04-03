<template>
	<div>
		<Header></Header>
		<section id="about">
			<div class="fbox">
				<h1 class="tagline">Geode is a...</h1>
				<div class="explanations">
					<p>
						<b>...advertising platform</b>
						that connects local business owners and consumers
					</p>
					<p>
						<b>...mobile app</b>
						that allows locals to view deals of community business owners
					</p>
					<p>
						<b>...a senior design project</b>
						that does something cool
					</p>
				</div>
			</div>
			<div class="fbox">
				<img class="home-gfx" src="../assets/phones.png" />

			</div>
		</section>
	</div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'About',
	components: {
		Header
	}
}
</script>

<style scoped></style>
