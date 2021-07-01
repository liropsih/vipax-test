<template>
  <div class="subscriptions">
    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
    <div v-else class="pb-3">
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="4"
          v-for="subscription in subscriptions"
          :key="subscription.id"
        >
          <b-card class="mb-3">
            <b-avatar class="mr-3" :src="subscription.avatar_url"></b-avatar>
                <span class="mr-auto">
                  <a :href="subscription.html_url">{{ subscription.login }}</a>
                </span>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Subscriptions',
  data: () => ({
    loading: true
  }),
  props: {
    subscriptionsUrl: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['subscriptions'])
  },
  async created() {
    if (!this.subscriptions) {
      await this.getUserSubscriptions(this.subscriptionsUrl)
    }
    this.loading = false
  },
  methods: {
    ...mapActions(['getUserSubscriptions'])
  }
}
</script>