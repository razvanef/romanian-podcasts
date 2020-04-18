import Vue from 'vue'
import Router from 'vue-router'
import PodcastsList from './views/PodcastsList.vue'
import PodcastDetails from './views/PodcastDetails.vue'
import addPodcast from './components/AddPodcast.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
        path: '/',
        component: PodcastsList,
        children: [
            {
                name: 'podcastDetails',
                path: '/podcast/:podcastId',
                component: PodcastDetails,
                props: true
            },
        ]
        },
        {
            // name: 'addPodcast',
            path: '/add',
            component: addPodcast
        }
    ]
})