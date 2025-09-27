import { Pipeline } from "../../../context/pipeline";

// Import errors
import { ClientError, isStandardError } from "../../../error";

// Import functions
import { count } from "../functions/count";

// Import schema & validators
import { createValidationStepExecutor } from "../../../validation/joi/helper";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

const countQuotesPipeline = new Pipeline<RuntimeContext>(
  "Count quotes pipeline"
);

countQuotesPipeline.addStep(count).addStep<void>((ctx) => {
  if (isStandardError(ctx.prevResult)) {
    return ctx.sendError(ctx.prevResult);
  }

  return ctx.sendJson(ctx.prevResult);
});

export { countQuotesPipeline };
