import { invoke } from '@tauri-apps/api';
import { BaseClient } from '../';
import { GenerateImageError, GenerateImageRequest, GenerateImageResponse } from '../types';

export class TuariClient extends BaseClient {
	constructor() {
		super();
	}

	async hello(name?: string | undefined): Promise<string> {
		return await invoke('hello_wrapper', { name: name || 'from Tauri' });
	}

	async generate_image(request: GenerateImageRequest): Promise<GenerateImageResponse> {
		try {
			const response: GenerateImageResponse = await invoke('generate_image', { request: request });
			return response;
		} catch (err) {
			const error = err as GenerateImageError;
			return {
				data: [],
				error: error
			};
		}
	}
}
