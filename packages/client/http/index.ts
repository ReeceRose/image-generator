import axios, { AxiosInstance } from 'axios';
import { BaseClient } from '../';

export class HTTPClient extends BaseClient {
	client: AxiosInstance;

	constructor(base: string) {
		super();
		this.client = axios.create({
			baseURL: base || 'http://localhost:8000'
		});
	}

	async hello(name?: string | undefined): Promise<string> {
		const response = await this.client.get('/?name=' + (name || 'world'));
		return response.data.msg;
	}
}
