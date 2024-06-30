/*const routeConfig = {
  "/login": {
    requiresAuth: false,
    redirectTo: "/dashboard", // Redirect to dashboard if already logged in
  },
  "/account": {
    requiresAuth: true,
    redirectTo: "/login", // Redirect to login if not logged in
  },
  "/checkout": {
    requiresAuth: true,
    redirectTo: "/login",
  },
  "/payment": {
    requiresAuth: true,
    redirectTo: (currentPath) => {
      // Custom redirect logic based on currentPath or other conditions
      if (currentPath === "/checkout") {
        return null; // Allow access if coming from checkout
      } else {
        return "/checkout"; // Redirect to checkout if not coming from there
      }
    },
  },
};
*/
export interface redirectsInterface {
  [key: string]: {
    originRoutes: string[];
    redirectTo: string;
    requiresAuth: boolean;
  };
}

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
