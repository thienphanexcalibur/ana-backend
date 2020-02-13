import {hash as bcryptHash, compare as bcryptCompare} from 'bcrypt';
import {promisify} from 'util';
import {sign, verify} from 'jsonwebtoken';
const fs = require('fs');
const path = require('path');

// Read private key file to retrieve the Buffer, using as our secret key
declare const Buffer;
const secret: Buffer = fs.readFileSync(path.resolve(__dirname, '../../private.pem'));

/*
 * Generate hash
 * @param {String} s
 * @param {Number} salt
 * @return Promise<String>
 */
export function _hash(s: string, salt = 12) : Promise<string> {
	return promisify(bcryptHash)(s, salt);
}

/**
 * Compare hashes
 * @param {String} s1
 * @param {String} s2
 * @return Promise<boolean>
 */
export function _hashCompare(s1: string, hash: string) : Promise<boolean> {
	return promisify(bcryptCompare)(s1, hash);
}

interface PayloadAuth extends Object {
		username: string,
		password: string
}

/**
 * Generate auth token
 * @param {*} payload
 * @param {String} secretKey
 * @return string
 */
export function generateToken(payload: PayloadAuth) : string {
	return sign(payload, secret);
}

export function verifyToken<T>(token: string) : T {
	try {
		let decoded:any = verify(token, secret);
		return decoded;
	} catch(e) {
		return false as any;
	}
}

export {logger} from './log';
