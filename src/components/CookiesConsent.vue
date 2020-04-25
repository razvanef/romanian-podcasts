<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :right="snackBarRight"
    :bottom="snackBarBottom"
  >
    {{ text }}
    <v-btn color="pink" text @click="setAccepted()">{{ buttonText }}</v-btn>
  </v-snackbar>
</template>

<script>
import * as Cookie from "js-cookie";

const STORAGE_TYPES = {
  local: "localStorage",
  cookies: "cookies"
};

export default {
  name: "CookiesConsent",

  created() {
    if (this.storageType === STORAGE_TYPES.local) {
      // Check for availability of localStorage
      try {
        const test = "__vue-cookielaw-check-localStorage";
        if (typeof window !== "undefined") {
          window.localStorage.setItem(test, test);
          window.localStorage.removeItem(test);
        }
      } catch (e) {
        console.info(
          "Local storage is not supported, falling back to cookie use"
        );
        this.supportsLocalStorage = false;
      }
    }

    if (this.getAccepted()) {
      this.snackbar = false;
    }
  },

  computed: {
    canUseLocalStorage() {
      return (
        this.storageType === STORAGE_TYPES.local && this.supportsLocalStorage
      );
    }
  },

  methods: {
    getAccepted() {
      let accepted = false;
      if (this.canUseLocalStorage) {
        accepted = localStorage.getItem(this.storageName);
      } else {
        accepted = Cookie.get(this.storageName);
      }
      if (typeof accepted === "string") {
        accepted = JSON.parse(accepted);
      }

      return !!accepted;
    },
    setAccepted() {
      if (this.canUseLocalStorage) {
        localStorage.setItem(this.storageName, true);
      } else {
        Cookie.set(this.storageName, true, { expires: 30 });
      }
      this.snackbar = false;
    }
  },

  data: () => ({
    snackbar: true,
    text:
      "Acest site foloseste cookie-uri pentru a iti oferi cea mai buna experienta.",
    buttonText: "Accept",
    timeout: 0,
    snackBarRight: true,
    snackBarBottom: true,
    storageName: "cookieConsent",
    storageType: STORAGE_TYPES.cookies,
    supportsLocalStorage: true
  })
};
</script>
