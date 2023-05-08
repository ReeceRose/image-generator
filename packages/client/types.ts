export type GenerateImageRequest = {
	apiKey: string;
	imageCount: number;
	prompt: string;
	size: GenerateImageSize;
};

export enum GenerateImageSize {
	Small = '256x256',
	Medium = '512x512',
	Large = '1024x1024'
}

export type GenerateImageResponse = {
	data: Image[];
	error: GenerateImageError;
};

export type Image = {
	url: string;
};

export type GenerateImageError = {
	message: string;
};
