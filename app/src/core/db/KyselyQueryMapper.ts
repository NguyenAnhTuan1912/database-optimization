import {
  SelectQueryBuilder,
  InsertQueryBuilder,
  UpdateQueryBuilder,
  DeleteQueryBuilder,
} from "kysely";

import { QueryMapper } from "./QueryMapper";

// Import types
import type { TWhereCapableBuilder } from "./type/general";

export class KyselyQueryMapper<DB = any> extends QueryMapper {
  constructor() {
    super();
  }

  equal<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "=", value));
    return qb;
  }

  not<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "is not", value));
    return qb;
  }

  greater<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, ">", value));
    return qb;
  }

  less<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "<", value));
    return qb;
  }

  greaterOrEqual<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, ">=", value));
    return qb;
  }

  lessOrEqual<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "<=", value));
    return qb;
  }

  in<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "in", value));
    return qb;
  }

  like<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) => eb(field as any, "like", value));
    return qb;
  }

  between<QB = any>(qb: QB, field: string, value: any) {
    qb = (qb as any).where((eb: any) =>
      eb.between(field as any, value[0], value[1])
    );
    return qb;
  }
}
