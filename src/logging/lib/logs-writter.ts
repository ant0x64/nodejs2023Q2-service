import { Writable } from 'node:stream';
import { join } from 'node:path';

import { FileHandle, open, rename } from 'node:fs/promises';
import { EOL } from 'node:os';

export default class LogsWritter extends Writable {
  protected max_size: number;
  protected path: string;

  protected _fd: FileHandle | undefined;

  constructor(type: 'debug' | 'error' = 'debug') {
    super();
    this.max_size = parseInt(process.env.LOG_FILE_SIZE) * 1000 || 32000;
    this.path = join(process.cwd(), `logs/${type}.log`);
  }

  protected openFile(callback?: CallableFunction) {
    return open(this.path, 'a')
      .then((fd) => {
        this._fd = fd;
        callback ? callback() : null;
      })
      .catch((err) => {
        callback ? callback(err) : null;
      });
  }

  _construct(callback: (error?: Error) => void): void {
    this.openFile(callback);
  }

  _write(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error) => void,
  ): void {
    if (chunk.byteLength >= this.max_size) {
      process.stderr.write(
        'Chunk size more that the max file size property' + EOL,
      );
      return callback();
    }

    this._fd.stat().then(async (stat) => {
      const file_size = stat.size;
      const chunk_size = chunk.byteLength;

      if (file_size + chunk_size >= this.max_size) {
        // rotate
        await rename(this.path, this.path + '.' + Date.now() + '.back')
          .then(async () => {
            this._fd.close();
            await this.openFile();
          })
          .catch((err) => callback(err));
      }

      this._fd
        .write(chunk)
        .then(() => {
          callback();
        })
        .catch(callback);
    });
  }

  end() {
    this._fd.close();
    return this;
  }
}
