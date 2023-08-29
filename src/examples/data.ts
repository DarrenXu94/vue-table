import { faker } from "@faker-js/faker";
import { Field } from "src/components/VueTable.types";

export interface User {
  username: string;
  email: string;
  avatar: string;
}

export function createRandomUser(): User {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
}

export const USERS: any[] = faker.helpers.multiple(createRandomUser, {
  count: 15,
});

export const fields: Field[] = [
  { key: "username", value: "Username" },
  { key: "email", value: "Email" },
  { key: "avatar", value: "Avatar" },
];

export interface UserAdvanced {
  username: string;
  email: string;
  avatar: string;
  url: string;
  exampleEmail: string;
}

export function createRandomUserAdvanced(): UserAdvanced {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    url: faker.image.url(),
    exampleEmail: faker.internet.exampleEmail(),
  };
}

export const USERS_ADVANCED: UserAdvanced[] = faker.helpers.multiple(
  createRandomUserAdvanced,
  {
    count: 15,
  }
);

export const fieldsAdvanced: Field[] = [
  { key: "username", value: "Username" },
  { key: "email", value: "Email" },
  { key: "avatar", value: "Avatar" },
  { key: "url", value: "URL" },
  { key: "exampleEmail", value: "Example email" },
];
