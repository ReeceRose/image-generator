import { BaseClient } from '../';
import { invoke } from '@tauri-apps/api';

export class TuariClient extends BaseClient {
  constructor() {
    super();
  }

  async hello(name?: string | undefined): Promise<string> {
    return await invoke('hello_wrapper', {name: name || 'from Tauri'});
  }
}