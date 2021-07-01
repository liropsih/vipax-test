<template>
  <div class="home">
    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
    <div v-else>
      <b-container>
        <b-row class="pb-3">
          <b-col sm="12" md="4" lg="3">
            <img :src="user.avatar_url" class="mb-3" style="max-width: 100%" />
            <h5>
              <a :href="user.html_url">{{ user.name }}</a>
            </h5>
            <p>Дата создания аккаунта:</p>
            <span>{{ user.created_at }}</span>
          </b-col>
          <b-col sm="12" md="8" lg="9">
            <b-tabs content-class="mt-3">
              <b-tab title="Репозитории" active>
                <HomeRepos :reposUrl="user.repos_url" />
              </b-tab>
              <b-tab title="Подписки">
                <HomeSubscriptions :subscriptionsUrl="user.subscriptions_url" />
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HomeRepos from '@/components/app/HomeRepos.vue'
import HomeSubscriptions from '@/components/app/HomeSubscriptions.vue'
export default {
  name: 'Home',
  components: { HomeRepos, HomeSubscriptions },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters(['user'])
  },
  async created() {
    if (!this.user) {
      await this.getUserInfo()
    }
    this.loading = false
  },
  methods: {
    ...mapActions(['getUserInfo'])
  }
}
</script>
