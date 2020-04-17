<template>
  <div data-app>
    <v-dialog v-model="podcastDetailsShow" max-width="500">
      <v-card class="details-card mx-auto">
        <v-btn class="close-icon" icon light @click="podcastDetailsShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-img height="250" :src="podcast.cover"></v-img>
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
          <a
            v-if="podcast.website"
            class="mx-3"
            :href="podcast.website"
            target="_blank"
            title="Website"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
              ></path>
            </svg>
          </a>

          <a
            v-if="podcast.youtube"
            class="mx-3"
            :href="podcast.youtube"
            target="_blank"
            title="YouTube"
          >
            <img
              src="http://pngimg.com/uploads/youtube/youtube_PNG19.png"
              alt="YouTube Logo"
              height="28"
              width="28"
            >
          </a>

          <a
            v-if="podcast.soundcloud"
            class="mx-3"
            :href="podcast.soundcloud"
            target="_blank"
            title="Soundcloud"
          >
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-icon-3/512/social_style_3_soundCloud-512.png"
              alt="Soundcloud Logo"
              height="28"
              width="28"
            >
          </a>

          <a
            v-if="podcast.spotify"
            class="mx-3"
            :href="podcast.spotify"
            target="_blank"
            title="Spotify"
          >
            <div class="styles__iconWrapper___9XLUZ">
              <img
                src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/spotify.png"
                alt="Spotify Logo"
                height="28"
                width="28"
              >
            </div>
          </a>

          <a
            v-if="podcast.apple_podcasts"
            class="mx-3"
            :href="podcast.apple_podcasts"
            target="_blank"
            title="Apple Podcasts"
          >
            <img
              src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/apple_podcasts.png"
              alt="Apple Podcasts Logo"
              height="28"
              width="28"
            >
          </a>

          <a
            v-if="podcast.breaker"
            class="mx-3"
            :href="podcast.breaker"
            target="_blank"
            title="Breaker"
          >
            <img
              src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/breaker.png"
              alt="Breaker Logo"
              height="28"
              width="28"
            >
          </a>

          <a
            v-if="podcast.google_podcasts"
            class="mx-3"
            :href="podcast.google_podcasts"
            target="_blank"
            title="Google Podcasts"
          >
            <img
              src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/google_podcasts.png"
              alt="Google Podcasts Logo"
              height="28"
              width="28"
            >
          </a>

          <a
            v-if="podcast.overcast"
            class="mx-3"
            :href="podcast.overcast"
            target="_blank"
            title="Overcast"
          >
            <div class="styles__iconWrapper___9XLUZ">
              <img
                src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/overcast.png"
                alt="Overcast Logo"
                height="28"
                width="28"
              >
            </div>
          </a>

          <a
            v-if="podcast.pocket_cast"
            class="mx-3"
            :href="podcast.pocket_cast"
            target="_blank"
            title="Pocket Casts"
          >
            <div class="styles__iconWrapper___9XLUZ">
              <img
                src="https://d12xoj7p9moygp.cloudfront.net/images/podcast/logo-square/006/pocket_casts.png"
                alt="Pocket Casts Logo"
                height="28"
                width="28"
              >
            </div>
          </a>
        </v-card-actions>

        <v-divider class="mx-4"></v-divider>

        <v-card-text class="px-3">
          <div class="my-4 subtitle-1">
            <v-chip
              class="ma-2"
              outlined
              v-for="(category, index) in podcast.categories"
              :key="index"
            >{{ category }}</v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    name: "PodcastDetails",
    props: {
        podcastDetailsShow: Boolean,
        podcast: {
            website: {
                type: String,
                required: false
            },
            rss: {
                type: String,
                required: false
            },
            apple_podcasts: {
                type: String,
                required: false
            },
            overcast: {
                type: String,
                required: false
            },
            google_podcasts: {
                type: String,
                required: false
            },
            categories: {
                type: Array,
                required: false
            },
            host: {
                type: String,
                required: true
            },
            cover: {
                type: String,
                required: true
            },
            spotify: {
                type: String,
                required: false
            },
            description: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            youtube: {
                type: String,
                required: false
            },
            pocket_cast: {
                type: String,
                required: false
            },
            soundcloud: {
                type: String,
                required: false
            },
        }
    },
    created() {
        console.log(this.podcast)
        this.loading = true;
        fetch(this.podcast.rss)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            console.log(data)
        });
    }
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

