<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Add an user</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      <form action="" method="post">
        <label for="name">Name</label>
        <input required placeholder="Enter name" v-model="name" class="inp" id="name" type="text" />
        <label for="login">Login</label>
        <input required placeholder="Enter login" v-model="login" class="inp" id="login" type="text" />
        <label for="password">Password</label>
        <input required placeholder="Enter password" v-model="password" class="inp" id="password" type="text" />
        <label for="role">Role</label>
        <select required v-model="role" class="mb-4" name="role" id="role">
          <option value="1">Admin</option>
          <option value="2">Waiter</option>
          <option value="3">Cook</option>
        </select>
        <button @click.prevent="addUser" class="but">Add</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "add-user",
  data() {
    return {
      show: false,
        name: '',
        login: '',
        password: '',
        role: '',
        options: [
            { value: 3, text: 'Повар' },
            { value: 2, text: 'Официант' },
            { value: 1, text: 'Администратор' }
        ],
        body: {}
    };
  },
  methods: {
      ...mapActions({addUserAction: 'admin/addUser/addUser'}),
      async addUser() {
          console.log(this.role)
          console.log(this.options.filter(opt => opt.value === +this.role))
          if (this.name || this.login || this.password || this.role) {
              const group = this.options.filter(opt => opt.value === +this.role)[0].text;
              
              this.body = {
                name: this.name,
                surname: this.surname,
                login: this.login,
                password: this.password,
                role_id: this.role,
                group
            }
              await this.addUserAction(this.body)
              this.name = ''
              this.login = ''
              this.password = ''
              this.role = ''
              this.show = false
          }
      },
    close() {
      this.show = false;
    },
  },
};
</script>
<style module>
.modal {
  background: #fff;
  border-radius: 25px;
  box-shadow: 0px 0px 50px -1px rgba(34, 60, 80, 0.5);
}
.modal h2 {
  color: var(--sherpa-blue);
}
.forModal {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 90;
  background: rgba(0, 0, 0, 0.24);
  left: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal i {
  font-size: 2rem;
  cursor: pointer;
  color: var(--ocean-green);
  transition: color linear 0.5s;
}
.modal i:hover {
  color: var(--sherpa-blue);
}
</style>
