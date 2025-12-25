export interface RefreshTokenResponse {
  data: {
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
  };
}
