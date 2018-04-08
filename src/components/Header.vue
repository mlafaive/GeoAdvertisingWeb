<template>
    <header class='mb-5'>
        <b-row class='d-flex align-items-center'>
            <b-col cols='12' md='3' class='text-center text-md-left'>
                <span class="logo">
                    <router-link to="/" class="text-success">geode</router-link>
                </span>
            </b-col>
            <b-col cols='12' md='9' class='text-center'>
                <ul v-if="$store.state.email === null" class="nav float-md-right">
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/about">About</router-link>
                    </li>
                    <li>
                        <router-link to="/contact">Contact</router-link>
                    </li>
                    <li>
                        <router-link to="/login">Login</router-link>
                    </li>
                </ul>
                <ul v-else class='nav float-md-right'>
                    <li>
                        <router-link to="/account-dashboard">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="#">Advertisements</router-link>
                    </li>
                    <li>
                        <router-link to="#">Settings</router-link>
                    </li>
                    <li>
                        <router-link to="/logout">Log Out</router-link>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </header>
</template>

<script>
export default {
}
</script>
