import axios, { AxiosInstance } from 'axios';
import { BaseClient } from '../';
import { GenerateImageError, GenerateImageRequest, GenerateImageResponse } from '../types';

export class HTTPClient extends BaseClient {
	client: AxiosInstance;

	constructor(base: string) {
		super();
		this.client = axios.create({
			baseURL: base || 'http://localhost:8000'
		});
	}

	async generate_image(request: GenerateImageRequest): Promise<GenerateImageResponse> {
		try {
			const response = await this.client.post('/', request);
			return response.data;
		} catch (err) {
			const error = err as GenerateImageError;
			return {
				data: [],
				error: error
			};
		}
	}
}
