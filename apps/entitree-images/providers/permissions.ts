import { PermissionsConfig } from "../types/roles";

export const permissionsConfig: PermissionsConfig = {
  ADMIN: [{ action: "*", resource: "*" }], //admin can do anything
  USER: [
    { action: "*", resource: "*" },
    {
      type: "deny",
      action: ["edit", "delete", "create", "list", "show", "export"],
      resource: "user",
    },
  ],
};
