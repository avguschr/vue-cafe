<template>
  <div>
    <div @click="openUser" :class="$style.card">
      <h2>{{ title }}</h2>
      <p>{{ status }}</p>
      <p>{{ group }}</p>
    </div>
    <user :user="user" ref="user" :id="id" />
  </div>
</template>
<script>
import User from "./User";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "card-component",
  props: ["title", "status", "group", "id"],
  components: {
    User,
  },
  methods: {
    ...mapActions({ getUser: "admin/user/getUser" }),
    async openUser() {
      if (this.user) {
        this.$refs.user.show = true;
        await this.getUser(this.id);
      }
    },
  },
  computed: {
    ...mapGetters({ user: "admin/user/user" }),
  },
};
</script>
<style module>
.card {
  border-radius: 15px;
  padding: 1rem;
  background: var(--ocean-green);
  box-shadow: 0px 0px 61px -11px rgba(34, 60, 80, 0.2) inset;
  transition: box-shadow linear 0.5s;
}
.card h2 {
  font-size: 2rem;
  color: #fff;
}
.card p {
  color: var(--sherpa-blue);
}
.card p,
.card h2 {
  margin-bottom: 0.5rem;
}
.card:hover {
  box-shadow: 0px 0px 51px -1px rgba(34, 60, 80, 0.7) inset;
  cursor: pointer;
}
</style>
