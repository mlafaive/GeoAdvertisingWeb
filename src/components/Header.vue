<template>
    <header class='mb-5'>
        <b-row class='d-flex align-items-center'>
            <b-col cols='12' md='6' class='text-center text-md-left'>
                <span class="logo">
                    <a href="/" class="text-success">geode</a>
                </span>
            </b-col>
            <b-col cols='12' md='6' class='text-center text-md-right'>
                <ul v-if="$store.state.email === null" class="nav float-md-right">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
                <ul v-else class='nav float-sm-right'>
                    <li>
                        <a href="/account-dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="#">Advertisements</a>
                    </li>
                    <li>
                        <a href="#">Settings</a>
                    </li>
                    <li>
                        <a href="/logout">Log Out</a>
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
