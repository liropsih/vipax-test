<template>
  <div class="repos">
    <div v-if="loading" class="text-center">
      <b-spinner />
    </div>
    <div v-else class="pb-3">
      <b-card
        v-for="repo in repos"
        :key="repo.id"
        :title="repo.name"
        tag="article"
        class="mb-2"
      >
        <b-card-text v-if="repo.description">
          {{ repo.description }}
        </b-card-text>
        <b-card-text> <b>Дата создания:</b> {{ repo.created_at }} </b-card-text>
        <b-card-text>
          <b-row align-v="center" style="">
            <b-col cols="auto">
              {{ repo.clone_url }}
            </b-col>
            <b-col cols="auto">
              <b-button
                variant="light"
                v-clipboard="() => repo.clone_url"
              >
                <b-icon-clipboard />
              </b-button>
            </b-col>
          </b-row>
        </b-card-text>
        <b-card-text>
          <b>Языки программирования:</b>
          <div v-for="(value, name) in repo.languages" :key="value">
            <span
              >{{ name }} ({{
                ((value / languagesMaxValues) * 100).toFixed(1)
              }}%)</span
            >
            <b-progress
              :value="value"
              :max="languagesMaxValues"
              class="mb-3"
            ></b-progress>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Repos',
  data: () => ({
    loading: true
  }),
  props: {
    reposUrl: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['repos']),
    languagesMaxValues() {
      let sum = 0
      if (this.repos) {
        this.repos.forEach(repo => {
          for (let value of Object.values(repo.languages)) {
            sum += value
          }
        })
      }
      return sum
    }
  },
  async created() {
    if (!this.repos) {
      await this.getUserRepos(this.reposUrl)
    }
    this.loading = false
  },
  methods: {
    ...mapActions(['getUserRepos'])
  }
}
</script>