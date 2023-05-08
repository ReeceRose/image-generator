import { GenerateImageRequest, GenerateImageResponse } from './types';

export class BaseClient {
	constructor() {}

	async generate_image(request: GenerateImageRequest): Promise<GenerateImageResponse> {
		throw new Error('Unimplemented. Do not use base client');
	}
}
