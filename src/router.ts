import { ApplicationRouter } from "@data/ApplicationRouter";
import { createRouter, createWebHistory } from "vue-router";
import { APP_CONFIG } from "@config/app";

export const router = createRouter({
    history: createWebHistory(APP_CONFIG.BASE_URL),
    routes: ApplicationRouter
})

export default router;