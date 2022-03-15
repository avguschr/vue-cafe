<template>
  <div>
    <add-user ref="addUser" />
    <h1 class="text-center mb-5">Users</h1>
    <div class="container">
      <div :class="$style.add" class="d-flex align-items-center mb-5">
        <i @click="openAddUser" class="fa-solid fa-plus"></i>
        <p @click="openAddUser" class="m-0">New user</p>
      </div>
      <div class="row row-cols-1" v-for="(user, index) in users" :key="index">
        <card
          class="col mb-3"
          :id="user.id"
          :title="user.name"
          :status="user.status"
          :group="user.group"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../../components/Card.vue";
import AddUser from "../../components/AddUser.vue";

export default {
  name: "users-component",
  components: {
    Card,
    AddUser,
  },
  methods: {
    ...mapActions({ getUsers: "admin/users/getUsers" }),
    openAddUser() {
      this.$refs.addUser.show = true;
    },
  },
  computed: {
    ...mapGetters({ users: "admin/users/users" }),
  },
  async created() {
    await this.getUsers();
  },
};
</script>
<style module>
.add i {
  margin-right: 0.2rem;
}
.add {
  color: var(--elf-green);
  transition: color linear 0.5s;
}
.add i,
.add p {
  cursor: pointer;
  font-size: 1.5rem;
}
.add:hover {
  color: var(--sherpa-blue);
}
</style>
