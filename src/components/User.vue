<template>
  <div>
    <div v-if="show" :class="$style.forModal">
      <div
        class="position-fixed top-50 start-50 translate-middle p-5"
        :class="$style.modal"
      >
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h2>{{ user.name }} {{ user.surname }} {{ user.patronymic }}</h2>
          <i @click="close" class="fa-solid fa-xmark"></i>
        </div>
        <div>
          <p>{{ user.status }}</p>
          <p>{{ user.group }}</p>
          <div class="d-flex flex-column">
            <div>
              <button @click="showInputAdd = !showInputAdd" class="but">
                Add
              </button>
              <button
                @click="showInputRemove = !showInputRemove"
                class="but m-3"
              >
                Remove
              </button>
              <button @click="dismissUser" class="but">Dismiss</button>
            </div>
            <input
              v-if="showInputAdd"
              placeholder="Choose shift number"
              class="inp"
              type="number"
              min="1"
              v-model="shiftIdAdd"
              required
              @keypress.enter="addUser"
            />
            <input
              v-if="showInputRemove"
              placeholder="Choose shift number"
              class="inp"
              type="number"
              min="1"
              v-model="shiftIdRemove"
              required
              @keypress.enter="removeUser"
            />
          </div>
        </div>
        <small-error ref="error" v-if="error" :text="error" />
        <small-error ref="error2" v-if="error2" :text="error2" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SmallError from "./SmallError.vue";
export default {
  name: "user-component",
  props: ["id", "user"],
  components: {
    SmallError,
  },
  data() {
    return {
      show: false,
      showInputAdd: false,
      showInputRemove: false,
      shiftIdAdd: "",
      shiftIdRemove: "",
    };
  },
  methods: {
    ...mapActions({
      dismiss: "admin/users/dismiss",
      getShifts: "admin/shifts/getShifts",
      addUserShift: "admin/addUserShift/addUserShift",
      removeUserShift: "admin/removeUserShift/removeUserShift",
    }),
    close() {
      this.show = false;
      this.showInputAdd = false;
    },
    async addUser() {
      if (this.shiftIdAdd) {
        await this.addUserShift({
          shift_id: +this.shiftIdAdd,
          user_id: +this.id,
        });
        this.shiftIdAdd = "";
        if (this.error) {
          this.$refs.error.show = true;
        } else {
          this.show = false;
        }
      }
    },
    async removeUser() {
      if (this.shiftIdRemove) {
        await this.removeUserShift({
          shift_id: +this.shiftIdRemove,
          user_id: +this.id,
        });
        this.shiftIdRemove = "";
        if (this.error2) {
          this.$refs.error2.show = true;
        } else {
          this.show = false;
        }
      }
    },
    async dismissUser() {
      await this.dismiss(this.id);
      this.show = false;
    },
  },
  computed: {
    ...mapGetters({
      error: "admin/addUserShift/error",
      error2: "admin/removeUserShift/error",
    }),
  },
};
</script>
<style module>
.modal {
  min-width: 50%;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0px 0px 50px -1px rgba(34, 60, 80, 0.5);
}
.modal h2,
p {
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
