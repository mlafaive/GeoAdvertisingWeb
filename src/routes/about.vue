<template>
	<div>
		<b-row class='flex align-items-center'>
			<b-col cols='6' pull='' md='4' offset-md='1' order-md='1'>
				<img class='img-fluid mb-4 mb-md-0' src="@/assets/phones.png" alt="" />
			</b-col>
			<b-col md='7'>
				<div class="mb-4 display-4 text-cyan">geode is a...</div>
				<div class="explanations">
					<h4 class='mb-4 ml-4 font-weight-light'>
						<b class='text-blue'>...advertising platform</b>
						that connects local business owners and consumers
					</h4>
					<h4 class='mb-4 ml-4 font-weight-light'>
						<b class='text-indigo'>...mobile app</b>
						that allows locals to view deals of community business owners
					</h4>
					<h4 class='ml-4 font-weight-light'>
						<b class='text-purple'>...senior design project</b>
						that does something cool
					</h4>
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<h2 class='mt-5 font-weight-light'>Want to learn more?</h2>
				<p class='lead'>
					<b><router-link :to="{path: 'contact'}">Contact us</router-link></b> to learn more about what <b class='text-green'>geode</b> can do for your business.
				</p>
			</b-col>
		</b-row>
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
