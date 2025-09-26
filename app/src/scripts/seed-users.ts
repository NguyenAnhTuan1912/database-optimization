import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { DBOPManager } from "../core/db/DBOPManager";

// Import types
import type { NewUser } from "../core/db/type/dbop";

console.log("Connecting to database ...");
const dbop = new DBOPManager();
const client = dbop.getClient();

async function seed() {
  let users: Array<NewUser> = [];

  const N = 10000;

  console.log("Start seed users");
  for (let i = 1; i <= N; i++) {
    const roleId = 1;
    const username = faker.internet.username();
    const email = faker.internet.email();
    const userHash = bcrypt.hashSync("user123456", bcrypt.genSaltSync(10));

    const fullName = faker.person.fullName();
    const phone = faker.phone.number({ style: "international" });
    const birthDate = faker.date
      .birthdate({ min: 18, max: 60, mode: "age" })
      .toISOString()
      .split("T")[0]; // yyyy-mm-dd
    const bio = faker.lorem.sentence();

    users.push({
      roleId,
      username,
      email,
      userHash,
      fullName,
      phone,
      birthDate,
      bio,
    });

    if (i % 100 === 0) {
      console.log("Seeded 100 users. Remaining: %d", N - i);

      console.log("Prepare to insert users");
      await client.insertInto("Users").values(users).execute();
      users = [];

      console.log("Insert done");
    }
  }
  console.log("Seed %d users done", N);
  client.destroy();
}

seed();
