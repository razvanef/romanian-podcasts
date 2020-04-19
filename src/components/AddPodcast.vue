<template>
    <v-row justify="center">
    <v-dialog v-model="addPodcastDialog" persistent max-width="600px">
      <v-card>
        <v-btn class="close-icon" icon light @click="cancel()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title>
          <span class="headline">Adauga Podcast</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="podcast.rss" label="Link RSS*" solo required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.youtube" label="YouTube" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.spotify" label="Spotify" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.applePodcasts" label="Apple Podcasts" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.googlePodcasts" label="Google Podcasts" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.soundcloud" label="Soundcloud" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.overcast" label="Overcast" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.pocketCast" label="Pocket Cast" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.breaker" label="Breaker" solo></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="podcast.castro" label="Castro" solo></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="cancel()">Renunta</v-btn>
          <v-btn color="blue darken-1" text @click="addPodcast(podcast)">Adauga</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: 'AddPodcast',
    data: () => ({
        addPodcastDialog: true,
        podcast: {}
    }),
    methods: {
        addPodcast(podcast) {
            fetch(podcast.rss)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                console.log(data)
                const name = data.getElementsByTagName("title")[0].childNodes[0].nodeValue;
                const podcastId = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, '').replace(/^\s+/g, '').split(' ').join('-')
                const description = data.getElementsByTagName("description")[0].childNodes[0].nodeValue;
                const website = data.getElementsByTagName("link")[0].childNodes[0].nodeValue;
                const host = data.getElementsByTagName("author")[0] ? data.getElementsByTagName("author")[0].childNodes[0].nodeValue : data.getElementsByTagName("itunes:author")[0].childNodes[0].nodeValue;
                const cover = data.getElementsByTagName("image")[0].getElementsByTagName("url")[0].childNodes[0].nodeValue;
                const categories = Array.from(data.getElementsByTagName("itunes:category")).filter(c => c !== '').map(category => category.getAttribute('text'));
                // const episodes = data.getElementsByTagName("item").length;
                const social = {
                    youtube: podcast.youtube || '',
                    spotify: podcast.spotify || '',
                    'apple_podcasts': podcast.applePodcasts || '',
                    'google_podcasts': podcast.googlePodcasts || '',
                    soundcloud: podcast.soundcloud || '',
                    overcast: podcast.overcast || '',
                    breaker: podcast.breaker || '',
                    castro: podcast.castro || '',
                }
                const podcastObj = { podcastId, name, description, website, rss: podcast.rss, host, cover, categories, ...social }
                const params = {
                    records: [{
                        fields: podcastObj
                    }]
                };

                fetch('https://api.airtable.com/v0/appat34KlYh94IXEb/Podcasts', {
                    headers: { 
                        Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(params)
                })
                this.$router.push('/')
            })
        },
        cancel() {
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
