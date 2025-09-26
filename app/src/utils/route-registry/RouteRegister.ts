let _instance: RouteRegistry<any> | null = null;

// Import types
import type { TRouteDefinition } from "./type";

class RouteRegistry<TRD extends any = TRouteDefinition> {
  private routes = new Map();

  constructor() {
    if (_instance) return _instance;
    _instance = this;
  }

  /**
   * @returns instance of route registry
   */
  static getInstance() {
    return _instance;
  }

  register(groupName: string, routeDefinition: TRD) {}

  /**
   * @returns all registered routes
   */
  getRoutes() {
    return this.routes;
  }
}
