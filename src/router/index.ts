import { createRouter, createWebHistory } from "vue-router";

export const routes = [
	{
		path: "/",
		name: "index",
		component: () => import("@/views/index.vue")
	},
	{
		path: "/:pathMatch(.*)",
		redirect: "/"
	}
] as const;

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
