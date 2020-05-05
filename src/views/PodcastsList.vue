<template>
  <v-container fluid>
    <v-row class="px-3 flex-right">
      <!-- <v-col cols="12"
                xs="12"
                lg="3"
                class="center-flex-vertically">
                <h3>{{podcasts.length}} podcasturi</h3>
            </v-col> -->
      <!-- <div class="spacer"></div> -->
      <v-col cols="12" xs="12" sm="6" md="4" lg="3">
        <v-autocomplete
          v-model="selectCategories"
          :items="categories"
          chips
          small-chips
          label="Categorii"
          multiple
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span v-if="index === 1" class="grey--text caption">
              (+{{ selectCategories.length - 1 }} others)</span
            >
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="4" lg="3">
        <v-text-field
          v-model="searchPodcast"
          label="Search"
          clearable
          prepend-inner-icon="fa-search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        class="card-col"
        v-for="podcast in filterPodcasts"
        :key="podcast.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        @click="rssLink = podcast.rss"
      >
        <v-skeleton-loader :loading="loading" type="card">
          <v-card class="ma-3">
            <router-link
              tag="div"
              :to="{
                name: 'podcastDetails',
                params: { podcastId: podcast.fields.podcastId }
              }"
            >
              <v-img :src="podcast.fields.cover"></v-img>
              <div class="card-container">
                <v-card-title>{{ podcast.fields.name }}</v-card-title>
                <v-card-subtitle>{{ podcast.fields.host }}</v-card-subtitle>
              </div>
            </router-link>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>

<script>
import categoriesList from "../assets/categories.js";

export default {
  name: "PodcastsList",
  data: () => ({
    title: "Podcast-uri romanesti",
    loading: false,
    podcasts: [],
    searchPodcast: "",
    selectCategories: [],
    categories: categoriesList
  }),
  created() {
    this.listPodcasts();
  },
  computed: {
    filterPodcasts() {
      const search = this.searchPodcast
        ? this.searchPodcast.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
      const list = this.podcasts;

      return list.filter(podcast => {
        return (
          !!(
            podcast.fields.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search.toLowerCase()) ||
            podcast.fields.host
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search.toLowerCase())
          ) &&
          !!(this.selectCategories.length > 0
            ? podcast.fields.categories.filter(value =>
                this.selectCategories.includes(value)
              ).length > 0
            : true)
        );
      });
    }
  },
  methods: {
    listPodcasts(offset = "") {
      this.loading = true;
      const fields =
        "&fields%5B%5D=podcastId&fields%5B%5D=name&fields%5B%5D=host&fields%5B%5D=cover&fields%5B%5D=description&fields%5B%5D=categories";
      fetch(
        `https://api.airtable.com/v0/appat34KlYh94IXEb/Podcasts?view=Grid%20view&offset=${offset}${fields}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}`
          }
        }
      )
        .then(res => res.json())
        .then(json => {
          this.podcasts = [...this.podcasts, ...json.records];
          this.loading = false;
          if (json.offset) this.listPodcasts(json.offset);
        });
    },
    
    track () {
      this.$ga.page('/')
    }
  },
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
      cursor: pointer;

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
