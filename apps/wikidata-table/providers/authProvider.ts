import { AuthProvider } from "react-admin";
import { signOut } from "next-auth/react";

export const authProvider = (session): AuthProvider => ({
  login: (params) => {
    console.log("login", params);
    return Promise.resolve();
  },
  checkError: (error) => {
    console.log("checkError", error);
    return Promise.resolve();
  },
  checkAuth: (params) => {
    console.log("checkAuth", params, session);
    if (session) return Promise.resolve();
    return Promise.reject();
  },
  logout: async (params) => {
    console.log("logout", params);
    //the callback is called again on login screen mount?
    if (params === null) await signOut();
    return Promise.resolve();
  },
  getIdentity: () => {
    console.log("getIdentity", session);
    if (session?.user)
      return Promise.resolve({
        id: session.user.email!,
        fullName: session.user.name!,
        avatar: session.user.image!,
      });
    else return Promise.reject();
  },
  getPermissions: (params) => {
    console.log("getPermissions", params);

    return Promise.resolve(session?.role);
  },
});
