<template>
    <div>
        <header v-if="email === null">
            <span class="logo">
                <a href="/" class="nav_landing">Geode</a>
            </span>
            <ul class="nav">
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
        </header>
        <header v-else>
            <span class="logo">
                <a href="/" class="nav_dash">Geode</a>
            </span>
            <ul class="nav">
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
        </header>
    </div>
</template>

<script>
export default {
    props: {
        email: {
            default: localStorage.getItem("email")
        }
    }
}
</script>

<style></style>
