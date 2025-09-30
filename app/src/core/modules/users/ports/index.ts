import { Pipeline } from "../../../context/pipeline";

// Import errors
import { ClientError, isStandardError } from "../../../error";

// Import functions
import { count } from "../functions/count";
import { getUser } from "../functions/get-user";
import { paginateUsers } from "../functions/paginate-users";
import { createUser } from "../functions/create-user";
import { updateUser } from "../functions/update-user";
import { deleteUser } from "../functions/delete-user";
import { checkUserIdInHeader } from "../../auth/functions/checkUserIdInHeader";

// Import schema & validators
import { createValidationStepExecutor } from "../../../validation/joi/helper";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

export const countUsersPipeline = new Pipeline<RuntimeContext>(
  "Count users pipeline"
);

export const getUserPipeline = new Pipeline<RuntimeContext>(
  "Get users pipeline"
);

export const paginateUserPipeline = new Pipeline<RuntimeContext>(
  "Paginate users pipeline"
);

export const createUserPipeline = new Pipeline<RuntimeContext>(
  "Create users pipeline"
);

export const updateUserPipeline = new Pipeline<RuntimeContext>(
  "Update users pipeline"
);

export const deleteUserPipeline = new Pipeline<RuntimeContext>(
  "Delete users pipeline"
);

countUsersPipeline.addStep(count).addStep(Pipeline.processRuntimeResult);

getUserPipeline
  .addStep(checkUserIdInHeader)
  .addStep(getUser)
  .addStep(Pipeline.processRuntimeResult);

paginateUserPipeline
  .addStep(checkUserIdInHeader)
  .addStep(paginateUsers)
  .addStep(Pipeline.processRuntimeResult);

createUserPipeline
  .addStep(checkUserIdInHeader)
  .addStep(createUser)
  .addStep(Pipeline.processRuntimeResult);

updateUserPipeline
  .addStep(checkUserIdInHeader)
  .addStep(updateUser)
  .addStep(Pipeline.processRuntimeResult);

deleteUserPipeline
  .addStep(checkUserIdInHeader)
  .addStep(deleteUser)
  .addStep(Pipeline.processRuntimeResult);
