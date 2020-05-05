<template>
  <div data-app>
    <v-dialog persistent v-model="podcastDetailsShow" max-width="500">
      <v-skeleton-loader :loading="loading" type="card">
        <v-card class="details-card mx-auto" v-if="podcast">
          <v-btn class="close-icon" icon light @click="$router.push('/')">
            <v-icon>fa-times-circle</v-icon>
          </v-btn>
          <v-img height="250" v-if="podcast" :src="podcast.cover"></v-img>
          <v-card-title>{{ podcast.name }}</v-card-title>
          <v-card-subtitle>{{ podcast.host }}</v-card-subtitle>
          <v-divider class="mx-4"></v-divider>
          <v-card-text v-if="podcast.description" class="py-4">
            <!-- <v-row align="center" class="mx-0">
                                            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                                            <div class="grey--text ml-4">4.5 (413)</div>
                    </v-row>-->
            <span>{{ podcast.description }}</span>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="pt-4 pb-2">
            <v-card-title class="pa-0">Asculta:</v-card-title>
          </v-card-text>
          <v-card-actions class="px-3">
            <ListenButtons :podcast="podcast" />
          </v-card-actions>

          <v-divider class="mx-4"></v-divider>

          <v-card-text class="px-3">
            <div class="my-4 subtitle-1">
              <v-chip
                class="ma-2"
                outlined
                v-for="(category, index) in podcast.categories"
                :key="index"
                >{{ category }}</v-chip
              >
            </div>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-dialog>
  </div>
</template>

<script>
import ListenButtons from "../components/ListenButtons";

export default {
  name: "PodcastDetails",
  components: {
    ListenButtons
  },
  data: () => ({
    podcastDetailsShow: true,
    podcast: {},
    loading: false
  }),
  props: ["podcastId"],
  created() {
    if (!this.podcast) return;
    this.loading = true;

    fetch(
      `https://api.airtable.com/v0/appat34KlYh94IXEb/Podcasts?maxRecords=1&view=Grid%20view&filterByFormula=podcastId='${this.podcastId}'`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}`
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        this.podcast = json.records[0].fields;
        this.loading = false;
      });
  },
  metaInfo() {
    return {
      title: this.podcast.name,
      meta: [
        { name: 'description', content: this.podcast.description},
        { property: 'og:title', content: this.podcast.name},
        { property: 'og:site_name', content: "Podcasturi Romanesti"},
        { property: 'og:type', content: 'website'}
      ]
    };
  },

  methods: {
    track () {
      this.$ga.page(`/${this.podcast.id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  z-index: 1;
  right: 5px;
  top: 5px;
  height: 28px !important;
  width: 28px !important;
  background-color: #ffffff7a;
}
</style>
