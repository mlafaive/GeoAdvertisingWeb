<template>
    <header class='mb-5'>
        <b-row v-if="$store.state.email === null">
            <b-col cols='12' sm='6'>
                <span class="logo">
                    <a href="/" class="nav_landing text-success">geode</a>
                </span>
            </b-col>
            <b-col cols='12' sm='6'>
                <ul class="nav float-sm-right">
                    <li>
                        <a href="/" class="nav_landing">Home</a>
                    </li>
                    <li>
                        <a href="/about" class="nav_about">About</a>
                    </li>
                    <li>
                        <a href="/contact" class="nav_contact">Contact</a>
                    </li>
                    <li>
                        <a href="/login" class="nav_login">Log In</a>
                    </li>
                </ul>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols='12' sm='6' class='align-middle'>
                <span class="logo">
                    <a href="/" class="nav_dash">Geode</a>
                </span>
            </b-col>
            <b-col cols='12' sm='6' class='align-middle'>
                <ul class='nav float-sm-right'>
                    <li>
                        <a href="/account-dashboard" class="nav_dash">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" class="nav_ads">Advertisements</a>
                    </li>
                    <li>
                        <a href="#" class="nav_settings">Settings</a>
                    </li>
                    <li>
                        <a href="/logout" class="nav_logout">Log Out</a>
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
