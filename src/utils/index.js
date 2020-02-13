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
/**
 * Compare hashes
 * @param {String} s1
 * @param {String} s2
 * @return Promise<boolean>
 */
function _hashCompare(s1, hash) {
    return util_1.promisify(bcrypt_1.compare)(s1, hash);
}
exports._hashCompare = _hashCompare;
/**
 * Generate auth token
 * @param {*} payload
 * @param {String} secretKey
 * @return string
 */
function generateToken(payload) {
    return jsonwebtoken_1.sign(payload, secret);
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        var decoded = jsonwebtoken_1.verify(token, secret);
        return decoded;
    }
    catch (e) {
        return false;
    }
}
exports.verifyToken = verifyToken;
var log_1 = require("./log");
exports.logger = log_1.logger;
