<template>
    <v-app-bar app light color="white">
            <div class="d-flex align-center">
                <v-img
                alt="Podcasturi Romanesti"
                class="shrink mr-2"
                contain
                src="../assets/podcasturi-romanesti-logo.png"
                transition="scale-transition"
                width="180"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="mailto:razvanef@gmail.com?subject=Podcasturi Romanesti" target="_blank" text>
                <span class="mr-2">Ai o sugestie?</span>
                <v-icon>mdi-email-outline</v-icon>
            </v-btn>
    </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
</style>
