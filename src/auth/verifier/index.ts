import { commonAuth } from "./common-auth-test";

// define type of function commonAuth
export type authType = (
  idToken: string
) => Promise<{ user_uuid: string; email: string; user_name: string }>;

export const LoginVerifier: authType = commonAuth;


// export const LoginVerifier = async (authFunction: authType, idToken: string) => {
//     return await authFunction(idToken);
// } 