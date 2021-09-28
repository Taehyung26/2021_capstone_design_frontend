import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "./views/Home";
// import Search from "./views/Search";
// import MarkList from "./views/MarkList";
// import OpenList from "./views/OpenList";
// import ParkInfo from "./views/ParkInfo";
// import Review from "./views/Review";


Vue.use(VueRouter)



const router = new VueRouter({
    mode: "history",
    duplicateNavigationPolicy: 'ignore',
    routes: [{
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        // component: Home,
        component:() => import ("./views/Home"),

    },
    {
        path: "/search",
        name: "Search",
        // component: Search,
        component:() => import ("./views/Search"),
    },
    {
        path: "/markList",
        name: "MarkList",
        // component: MarkList,
        component:() => import ("./views/MarkList"),
    },
    {
        path: "/openList",
        name: "OpenList",
        // component: OpenList,
        component:() => import ("./views/OpenList"),
    },
    {
        path: "/parkInfo",
        name: "ParkInfo",
        // component: ParkInfo,
        component:() => import ("./views/ParkInfo"),
    },
    {
        path: "/review",
        name: "Review",
        // component: Review,
        component:() => import ("./views/Review"),
    },
    ]

})

export default router