import { hash, compare } from 'bcrypt';

export class HashService {
  static async hash(data) {
    return hash(data, parseInt(process.env.CRYPT_SALT));
  }

  static async compare(data, hash) {
    return compare(data, hash);
  }
}
