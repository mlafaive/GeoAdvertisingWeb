<template>
    <b-row>
        <b-jumbotron header="Welcome to the sandbox !~" class="mt-4"></b-jumbotron>
        <b-alert show variant="primary">Primary Alert</b-alert>
        <b-alert show variant="secondary">Secondary Alert</b-alert>
        <b-alert show variant="success">Success Alert</b-alert>
        <b-alert show variant="danger">Danger Alert</b-alert>
        <b-alert show variant="warning">Warning Alert</b-alert>
        <b-alert show variant="info">Info Alert</b-alert>
        <b-alert show variant="light">Light Alert</b-alert>
        <b-alert show variant="dark">Dark Alert</b-alert>

        <b-card-group deck>
            <b-card bg-variant="primary"></b-card>
            <b-card bg-variant="secondary"></b-card>
            <b-card bg-variant="success"></b-card>
            <b-card bg-variant="info"></b-card>
            <b-card bg-variant="warning"></b-card>
            <b-card bg-variant="danger"></b-card>
            <b-card bg-variant="light"></b-card>
            <b-card bg-variant="dark"></b-card>
        </b-card-group>
    </b-row>
</template>

<script>
export default {
	name: 'Sandbox',
}

</script>
