<template>
	<b-row>
		<b-col cols='6' pull='' md='4' offset-md='1' order-md='1'>
			<img class='img-fluid mb-4 mb-md-0' src="@/assets/placeholder.png" alt="" />
		</b-col>
		<b-col md='7'>
			<!-- <h1 class="text-gray">geode</h1> -->
			<div class="display-4 text-success mb-4">Find local gems</div>
			<p class="lead mb-5">
				A mobile application that sends you deals and sales for local businesses near you. Sign up to find relevant deals near you!
			</p>
			<p class='mb-5'>
				<a href="/about">
					<b>Learn More</b>
				</a>
			</p>
			<b-row>
				<b-col class="text-center">
					<img src="@/assets/google-play-badge.svg" class="mr-4" />
					<img src="@/assets/black_app_store.svg" />
				</b-col>
			</b-row>
		</b-col>
	</b-row>
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
