import { redirectsInterface } from "../types";
export const redirectsConfig: redirectsInterface = {
  "/payment": {
    originRoutes: ["/payment", "/checkout"],
    redirectTo: "/",
    requiresAuth: true,
  },
  "/success": {
    originRoutes: ["/payment"],
    redirectTo: "/",
    requiresAuth: true,
  },
  "/account": {
    originRoutes: [],
    redirectTo: "",
    requiresAuth: true,
  },
  "/history": {
    originRoutes: [],
    redirectTo: "",
    requiresAuth: true,
  },
  "/login": {
    originRoutes: [],
    redirectTo: "/account",
    requiresAuth: false,
  },
  "/register": {
    originRoutes: [],
    redirectTo: "/account",
    requiresAuth: false,
  },
};
