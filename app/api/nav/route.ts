import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const metaPath = path.join(process.cwd(), 'content', '_meta.json');
    if (!fs.existsSync(metaPath)) {
      return NextResponse.json({});
    }
    const meta = fs.readFileSync(metaPath, 'utf8');
    return NextResponse.json(JSON.parse(meta), {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
