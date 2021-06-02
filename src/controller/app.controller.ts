import Minio, { Client } from 'minio';

export default class AppController {
	public minio: Client;

	constructor() {
		this.minio = AppController.initMinioClient();
	}

	static initMinioClient(): Client {
		return new Minio.Client({
			endPoint: '0.0.0.0',
			port: 9000,
			useSSL: false,
			accessKey: 'minioadmin',
			secretKey: 'minioadmin'
		});
	}
}
