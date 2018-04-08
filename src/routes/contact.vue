<template>
	<b-row>
		<b-col class='text-center'>
			<h1 class='font-weight-semilight text-teal'>Questions?</h1>
			<h4 class='font-weight-light text-teal'>We'll get back to you <b>ASAP</b></h4>

			<b-form class='mt-5'>
				<b-form-row>
					<b-col md='6' offset-md='3' xl='4' offset-xl='4'>
						<b-form-group label="Name:" label-for="name">
							<b-form-input type='text' id='name' required autofocus></b-form-input>
						</b-form-group>

						<b-form-group label="Email Address:" label-for="email">
							<b-form-input type='email' id='email' required></b-form-input>
						</b-form-group>

						<b-form-group label="Message:" label-for="message">
							<b-form-textarea id='message' :rows='4' required></b-form-textarea>
						</b-form-group>

						<b-button type="submit" variant='info' block>Send Message</b-button>
					</b-col>
				</b-form-row>
			</b-form>
		</b-col>
	</b-row>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	name: 'Contact',
	components: {
		Header
	}
}
</script>

<style scoped></style>
