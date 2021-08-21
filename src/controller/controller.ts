import { Client } from 'minio';
import parse from 'url-parse';

const { MINIO_HOST, MINIO_PORT } = process.env;

export default class Controller {
	public minio: Client;

	constructor() {
		this.minio = new Client({
			endPoint: MINIO_HOST,
			port: Number(MINIO_PORT),
			useSSL: false,
			accessKey: 'minio',
			secretKey: 'minio-admin'
		});
	}

	async getStatic(pathname: string): Promise<string> {
		const path = pathname.substring(1, pathname.length);
		const paths = path.split('/');
		const bucket = paths[0];
		const filename = paths[1];
		if (pathname) {
			const url = await this.minio.presignedGetObject(bucket, filename);
			const parsed = parse(url);
			parsed.set('hostname', process.env.MINIO_DOMAIN);
			return parsed.href;
		}
		return '';
	}

	async putStatic(bucket: string, filename: string, buffer: Buffer): Promise<string> {
		// Check if bucket exists
		const exists = await this.minio.bucketExists(bucket);
		if (!exists) {
			await this.minio.makeBucket(bucket, process.env.MINIO_REGION);
		}
		await this.minio.putObject(bucket, filename, buffer);
		return `/${bucket}/${filename}`;
	}
}
