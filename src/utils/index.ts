import {hash as bcryptHash, compare as bcryptCompare} from 'bcrypt';
import {promisify} from 'util';
import {sign} from 'jsonwebtoken';

const fs = require('fs');
const path = require('path');

// Read private key file to retrieve the Buffer
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

export function _hashCompare(s1: string, s2: string) : Promise<boolean> {
	return bcryptCompare(s1, s2);
}
export function generateToken(payload: any, secretKey) {
	return sign(payload, secretKey);
}
export function verifyToken(token: string) {
}
