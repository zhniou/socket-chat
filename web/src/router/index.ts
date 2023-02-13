import {createRouter,createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: "/",
            name: "chat",
            component: () => import( "../view/chat/index.vue"),
        },
    ]
})

export default router;