export class TxtExportStrategy {
  async export(users: any[]) {
    const content = users
      .map((u) => `${u.name} | ${u.email} | ${u.role}`)
      .join('\n');

    return {
      fileName: 'users.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    };
  }
}
