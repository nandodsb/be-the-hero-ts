import * as crypto  from 'node:crypto';

export function generateUniqueId() {
    return crypto.randomBytes(4).toString('hex');
}