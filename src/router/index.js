// Composables
import {createRouter, createWebHistory} from 'vue-router'
import loginView from "@/views/loginView.vue";
import qrView from "@/views/qrView.vue";
import qrListView from "@/views/admin/qrListView.vue";
import {h} from 'vue'
import routerView from "@/router/components/routerView.vue";
import qrForm from "@/views/qrForm.vue";
import searchQueue from "@/views/searchQueue.vue";
import productsView from "@/views/admin/productsView.vue";

const comingSoon = {
  render: () => h('h1', "Coming soon...")
}

class Route {
  constructor(path, name, component, children) {
    this.path = path;
    this.name = name;
    this.component = component ?? comingSoon;
    this.children = children;
  }
}

const internal_routers = [
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'qrReaderView'}
  }
  // {
  //   path: '/',
  //   component: () => import('@/layouts/default/Default.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     },{
  //       path: '/admin',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     }, {
  //       path: '/qrView',
  //       name: 'qrReader',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/qrView.vue'),
  //     },
  //   ],
  // },
]

export const routes = [
  new Route('/login', 'login', loginView),
  new Route('/qr', null, routerView, [
    new Route('reader', 'qrReaderView', qrView),
    new Route('form', 'qrForm', qrForm),
    new Route('search', 'searchQueue', searchQueue),
  ]),
  new Route('/admin', 'adminRouterView', routerView, [
    new Route('qr-list', "qrListView", qrListView),
    new Route('product-list', "productsView", productsView)
  ]),
  ...internal_routers,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
