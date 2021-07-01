<template>
  <div class="team">
    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
    <div v-else>
      <b-container>
        <b-row class="pb-3">
          <b-col sm="12" md="6" offset-lg="1" lg="4">
            <p>Члены команды:</p>
            <div class="mb-3">
              <b-button-group>
                <b-button @click="sortTeamAsc" variant="light">
                  <b-icon-chevron-down />
                </b-button>
                <b-button @click="sortTeamDesc" variant="light">
                  <b-icon-chevron-up />
                </b-button>
              </b-button-group>
            </div>
            <b-list-group>
              <b-list-group-item
                class="d-flex align-items-center"
                v-for="(person, idx) in team"
                :key="person.id"
              >
                <b-avatar class="mr-3" :src="person.avatar_url"></b-avatar>
                <span class="mr-auto">
                  <a :href="person.html_url">{{ person.login }}</a>
                </span>
                <b-button variant="light" @click="removePerson(idx)">
                  <b-icon-x-square />
                </b-button>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col sm="12" md="6" offset-lg="2" lg="4">
            <p>Список пользователей:</p>
            <div>
              <div class="mb-3">
                <b-form-input v-model="searchedUser" placeholder="Поиск" />
              </div>
              <b-list-group>
                <b-list-group-item
                  class="d-flex align-items-center"
                  v-for="(user, idx) in search"
                  :key="user.id"
                >
                  <b-avatar class="mr-3" :src="user.avatar_url"></b-avatar>
                  <span class="mr-auto"
                    ><a :href="user.html_url">{{ user.login }}</a></span
                  >
                <b-button variant="light" @click="addUser(idx)">
                  <b-icon-plus-square />
                </b-button>
                  <!-- <b-badge class="pointer" @click="addUser(idx)">+</b-badge> -->
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Team',
  data: () => ({
    loading: true,
    searchedUser: ''
  }),
  computed: {
    team: {
      get() { return this.$store.getters.team },
      set(value) { this.updateTeam(value) }
    },
    users: {
      get() { return this.$store.getters.users },
      set(value) { this.updateUsers(value) }
    },
    search() {
      return this.users ? this.users.filter(user => user.login.includes(this.searchedUser)) : ''
    }
  },
  watch: {
    team(newArray) {
      this.team = newArray
    },
    users(newArray) {
      this.users = newArray
    }
  },
  async created() {
    if (!this.team) {
      await this.getTeam()
    }
    if (!this.users) {
      await this.getUsers()
    }
    this.loading = false
  },
  methods: {
    ...mapActions(['getTeam', 'updateTeam', 'getUsers', 'updateUsers']),
    addUser(idx) {
      this.team.push(this.users[idx])
      this.users.splice(idx, 1)
    },
    removePerson(idx) {
      this.users.push(this.team[idx])
      this.team.splice(idx, 1)

    },
    sortTeamAsc() {
      this.team.sort((a, b) => {
        if (a.login > b.login) {
          return 1
        }
        if (a.login < b.login) {
          return -1
        }
        return 0
      })
    },
    sortTeamDesc() {
      this.team.sort((a, b) => {
        if (a.login < b.login) {
          return 1
        }
        if (a.login > b.login) {
          return -1
        }
        return 0
      })
    }
  }
}
</script>
