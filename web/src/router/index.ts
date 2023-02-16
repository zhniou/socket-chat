import {createRouter,createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: "/",
            name: "chat",
            component: () => import( "../view/index.vue"),
        },
    ]
})

export default router;