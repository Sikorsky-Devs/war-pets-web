export type TEnv = {
  API_URL: string;
}

export const env: TEnv = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
}
