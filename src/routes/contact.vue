<template>
	<div>
		<Header></Header>
		<section id="contact">
			<div class="fbox">
				<form>
					<h1>Questions?
						<br>
						<small>We'll get back to you ASAP</small>
					</h1>
					<fieldset>
						<label for="name">Name:</label>
						<input type="text" id="name" name="user_name">

						<label for="mail">Email:</label>
						<input type="email" id="mail" name="user_email">

						<label for="msg">Message:</label>
						<textarea id="msg" name="msg" rows="4"></textarea>
					</fieldset>
					<button type="submit">Send Message</button>
				</form>
			</div>
		</section>
	</div>
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
