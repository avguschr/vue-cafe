<template>
  <div :class="$style.nav">
    <div
      class="container d-flex justify-content-between align-items-center"
      style="height: 100%"
    >
      <div><p>First</p></div>
      <ul class="d-flex justify-content-between align-items-center">
        <li class="d-inline">
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="!token" class="d-inline">
          <router-link to="/login">Log In</router-link>
        </li>
        <li v-else class="d-inline">
          <router-link to="/logout">Log Out</router-link>
        </li>
        <li v-if="token" class="d-inline">
          <div class="dropdown show">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="background: var(--allports)"
            >
              Admin
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style="background: var(--allports); border: none"
            >
              <router-link to="/users" class="dropdown-item">Users</router-link>
              <router-link to="/shifts" class="dropdown-item"
                >Shifts</router-link
              >
            </div>
          </div>
        </li>
        <li v-if="token" class="d-inline">
          <div class="dropdown show">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="background: var(--allports)"
            >
              Waiter
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style="background: var(--allports); border: none"
            >
              <router-link to="/orders" class="dropdown-item"
                >Orders</router-link
              >
            </div>
          </div>
        </li>

        <li v-if="token" class="d-inline">
          <div class="dropdown show">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="background: var(--allports)"
            >
              Cook
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style="background: var(--allports); border: none"
            >
              <router-link to="/active-orders" class="dropdown-item"
                >Orders</router-link
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "navbar-component",
  computed: {
    ...mapGetters({ tokener: "authorization/login/getToken" }),
    token() {
      return localStorage.getItem("token");
    },
  },
};
</script>
<style module>
.nav {
  width: 100%;
  background: var(--allports);
  height: 4rem;
  font-family: "Work Sans", sans-serif;
}
.nav ul {
  width: 70%;
  padding: 0;
  margin: 0;
  height: 100%;
}

.nav li {
  margin: 0;
  list-style: none;
  cursor: pointer;
}

.nav a {
  color: var(--geyser);
  text-decoration: none;
}

.nav p {
  font-size: 2rem;
  color: var(--geyser);
  cursor: pointer;
  margin: 0;
}

.nav select {
  cursor: pointer;
  background: var(--allports);
  border: none;
  color: var(--geyser);
  outline: none;
}

.nav select:active {
  border: none;
  outline: none;
}

.nav select:focus {
  border: none;
  outline: none;
}

.nav option:hover {
  background: red;
  cursor: pointer;
  color: red !important;
}
.nav .dropdown-menu a {
  color: var(--allports) !important;
}

.dropdown-menu.show {
  background: red;
}
</style>
