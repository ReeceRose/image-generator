export class BaseClient {
  constructor() {
  }

  async hello(name?: string | undefined): Promise<string> {
    throw new Error("Unimplemented. Do not use base client");
  }
}