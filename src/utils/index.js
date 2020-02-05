"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var util_1 = require("util");
var jsonwebtoken_1 = require("jsonwebtoken");
var fs = require('fs');
var path = require('path');
var secret = fs.readFileSync(path.resolve(__dirname, '../../private.pem'));
/*
 * Generate hash
 * @param {String} s
 * @param {Number} salt
 * @return Promise<String>
 */
function _hash(s, salt) {
    if (salt === void 0) { salt = 12; }
    return util_1.promisify(bcrypt_1.hash)(s, salt);
}
exports._hash = _hash;
function _hashCompare(s1, s2) {
    return bcrypt_1.compare(s1, s2);
}
exports._hashCompare = _hashCompare;
function generateToken(payload, secretKey) {
    return jsonwebtoken_1.sign(payload, secretKey);
}
exports.generateToken = generateToken;
function verifyToken(token) {
}
exports.verifyToken = verifyToken;
