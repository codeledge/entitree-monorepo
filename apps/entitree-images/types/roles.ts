import { Permission } from "ra-data-simple-prisma";
// import { Role } from "@prisma/client";
import { prismaClient } from "../prisma/prismaClient";

type Role = "ADMIN" | "USER";

export type Permissions = Permission<keyof typeof prismaClient>[];

export type PermissionsConfig = {
  [role in Role]: Permissions;
};
