export enum Routes {
  Home = "/",
  Profile = "/profile",
  SignUp = "/auth/sign-up",
  SignIn = "/auth/sign-in",
  AuthSuccess = "/auth/success",
  Adverts = "/adverts",
  Shelters = "/shelters",
  Shelter = "/shelters/[id]",
  Posts = "/posts",
}

export const PUBLIC_ROUTES = [
  Routes.Home,
  Routes.Adverts,
  Routes.Shelters,
  Routes.Shelter,
  Routes.Posts,
];
export const PROTECTED_ROUTES = [Routes.Profile];
export const AUTH_ROUTES = [Routes.SignUp, Routes.SignIn, Routes.AuthSuccess];

export const navigation = [
  { href: Routes.Posts, label: "Pet Stories" },
  { href: Routes.Adverts, label: "Оголошення" },
  { href: Routes.Shelters, label: "Притулки" },
];
