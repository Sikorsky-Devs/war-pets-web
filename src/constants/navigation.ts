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
}

export const navigation = [
  { href: Routes.Adverts, label: "Оголошення" },
  { href: Routes.Shelters, label: "Притулки" },
];
