import { format } from '@fast-csv/format';
import { Writable } from 'stream';

export class CsvExportStrategy {
  async export(users: any[]) {
    const chunks: Buffer[] = [];

    const writable = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    });

    const csvStream = format({
      headers: ['Name', 'Email', 'Username', 'Role'],
    });

    csvStream.pipe(writable);

    users.forEach((user) => {
      csvStream.write({
        Name: user.name,
        Email: user.email,
        Username: user.username,
        Role: user.role,
      });
    });

    csvStream.end();

    await new Promise<void>((resolve) => {
      writable.on('finish', () => resolve());
    });

    return {
      fileName: 'users.csv',
      mimeType: 'text/csv',
      buffer: Buffer.concat(chunks),
    };
  }
}
