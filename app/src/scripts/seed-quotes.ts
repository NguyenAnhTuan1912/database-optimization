import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { DBOPManager } from "../core/db/DBOPManager";

// Import types
import type { NewQuote } from "../core/db/type/dbop";

console.log("Connecting to database ...");
const dbop = new DBOPManager();
const client = dbop.getClient();

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) : str;
}

async function seed() {
  let quotes: Array<NewQuote> = [];

  const N = 10000;

  console.log("Start seed quotes");
  for (let i = 1; i <= N; i++) {
    quotes.push({
      userId: faker.helpers.arrayElement(userIds),
      title: truncate(faker.lorem.words({ min: 3, max: 6 }), 64),
      description: truncate(faker.lorem.sentence({ min: 10, max: 32 }), 512),
    });

    if (i % 100 === 0) {
      console.log("Seeded 100 quotes. Remaining: %d", N - i);

      console.log("Prepare to insert quotes");
      await client.insertInto("Quotes").values(quotes).execute();
      quotes = [];

      console.log("Insert done");
    }
  }
  console.log("Seed %d quotes done", N);
  client.destroy();
}

seed();
