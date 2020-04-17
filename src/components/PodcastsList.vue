<template>
  <v-container fluid>
    <v-row dense>
        <v-col
            class="card-col"
            v-for="podcast in podcasts"
            :key="podcast.id"
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
        >
            <v-skeleton-loader :loading="loading" type="card">
            <v-card class="ma-3" @click="showDetails(podcast.fields)">
                <v-img :src="podcast.fields.cover"></v-img>
                <div class="card-container">
                <v-card-title>{{ podcast.fields.name }}</v-card-title>
                <v-card-subtitle>{{ podcast.fields.host }}</v-card-subtitle>
                </div>
            </v-card>
            </v-skeleton-loader>
        </v-col>
    </v-row>
    <PodcastDetails :podcastDetailsShow="podcastDetailsDialog" :podcast="podcastDetails"/>
  </v-container>
</template>

<script>
import PodcastDetails from "./PodcastDetails";

export default {
  name: "PodcastsList",
  components: {
    PodcastDetails
  },
  data: () => ({
    title: "Podcast-uri romanesti",
    loading: false,
    podcasts: [],
    podcastDetailsDialog: false,
    podcastDetails: {}
  }),
  created() {
    this.loading = true;
    fetch(
      "https://api.airtable.com/v0/appat34KlYh94IXEb/Podcasts?maxRecords=100&view=Grid%20view",
      {
        headers: { Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}` }
      }
    )
      .then(res => res.json())
      .then(json => {
        this.podcasts = json.records;
        this.loading = false;
      });
  },
  methods: {
    showDetails(podcast) {
      this.podcastDetailsDialog = true;
      this.podcastDetails = podcast;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-col {
  display: flex;
  flex-direction: column;

  .v-skeleton-loader {
    flex: 1;
    display: flex;
    flex-direction: column;

    .v-card {
      flex: 1;

      &:hover {
        box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2),
          0px 22px 35px 3px rgba(0, 0, 0, 0.14),
          0px 8px 42px 7px rgba(0, 0, 0, 0.12) !important;
      }

      .v-image {
        width: 100%;
        padding-bottom: 100%;
        height: 0;
      }
    }
  }

  .card-container {
    padding: 16px;
  }

  .v-card__title,
  .v-card__subtitle {
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
  }
  .v-card__title {
    max-height: 96px;
    -webkit-line-clamp: 2;
    margin-bottom: 16px;
  }
  .v-card__subtitle {
    max-height: 38px;
    -webkit-line-clamp: 1;
  }
}
</style>
