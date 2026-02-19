import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getFileUrl(filename: string): string {
    return `${process.env.BACKEND_URL || 'http://localhost:4000'}/uploads/${filename}`;
  }
}