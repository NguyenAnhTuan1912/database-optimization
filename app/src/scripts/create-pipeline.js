const fs = require("fs");
const path = require("path");

const template = `
import { Pipeline } from "../../../context/pipeline";

// Import errors
import { ClientError, isStandardError } from "../../../error";

// Import functions

// Import schema & validators
import { createValidationStepExecutor } from "../../../validation/joi/helper";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

const pipeline = new Pipeline<RuntimeContext>("My new Pipeline");

export { pipeline };
`;

const PROJECT_ROOT_NAME = "app";
const SRC_NAME = "src";
const MODULES_NAME = "modules";

const CWD = process.cwd();

if (!CWD.endsWith(PROJECT_ROOT_NAME)) {
  throw new Error("You must be in %s folder", PROJECT_ROOT_NAME);
}

const SRC_PATH = path.resolve(PROJECT_ROOT_NAME, SRC_NAME);
const MODULES_PATH = path.resolve(SRC_PATH, "core", MODULES_NAME);

if (!fs.existsSync(MODULES_PATH)) {
  console.log("Folder modules doesn't exist, create one.");
  fs.mkdirSync(MODULES_PATH);
}
