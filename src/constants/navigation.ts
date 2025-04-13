export enum Routes {
  Home = "/",
  Profile = "/profile",
  ShelterProfile = "/shelter-profile",
  SignUp = "/auth/sign-up",
  SignIn = "/auth/sign-in",
  AuthSuccess = "/auth/success",
  Adverts = "/adverts",
  Shelters = "/shelters",
  Shelter = "/shelters/[id]",
  Posts = "/posts",
}

export const navigation = [
  { href: Routes.Posts, label: "Pet Stories" },
  { href: Routes.Adverts, label: "Оголошення" },
  { href: Routes.Shelters, label: "Притулки" },
];
