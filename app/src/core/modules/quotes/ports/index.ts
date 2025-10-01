import { Pipeline } from "../../../context/pipeline";

// Import errors
import { ClientError, isStandardError } from "../../../error";

// Import functions
import { count } from "../functions/count";
import { getQuote } from "../functions/get-quote";
import { paginateQuotes } from "../functions/paginate-quotes";
import { createQuote } from "../functions/create-quote";
import { updateQuote } from "../functions/update-quote";
import { deleteQuote } from "../functions/delete-quote";
import { getCachedQuote } from "../functions/get-cached-quote";
import { getCachedQuotes } from "../functions/get-cached-quotes";
import { writeCachedQuote } from "../functions/write-cached-quote";
import { writeCachedQuotes } from "../functions/write-cached-quotes";

// Import schema & validators
import { createValidationStepExecutor } from "../../../validation/joi/helper";

// Import types
import type { RuntimeContext } from "../../../context/runtime-context";

export const countQuotesPipeline = new Pipeline<RuntimeContext>(
  "Count quotes pipeline"
);

export const getQuotePipeline = new Pipeline<RuntimeContext>(
  "Get quotes pipeline"
);

export const paginateQuotePipeline = new Pipeline<RuntimeContext>(
  "Paginate quotes pipeline"
);

export const createQuotePipeline = new Pipeline<RuntimeContext>(
  "Create quotes pipeline"
);

export const updateQuotePipeline = new Pipeline<RuntimeContext>(
  "Update quotes pipeline"
);

export const deleteQuotePipeline = new Pipeline<RuntimeContext>(
  "Delete quotes pipeline"
);

countQuotesPipeline.addStep(count).addStep(Pipeline.processRuntimeResult);

getQuotePipeline
  .addStep(getCachedQuote)
  .addStep(getQuote)
  .addStep(writeCachedQuote)
  .addStep(Pipeline.processRuntimeResult);

paginateQuotePipeline
  .addStep(getCachedQuotes)
  .addStep(paginateQuotes)
  .addStep(writeCachedQuotes)
  .addStep(Pipeline.processRuntimeResult);

createQuotePipeline.addStep(createQuote).addStep(Pipeline.processRuntimeResult);

updateQuotePipeline.addStep(updateQuote).addStep(Pipeline.processRuntimeResult);

deleteQuotePipeline.addStep(deleteQuote).addStep(Pipeline.processRuntimeResult);
