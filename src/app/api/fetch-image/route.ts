import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const contentType = response.headers['content-type'];
    if (contentType) {
      return new NextResponse(response.data, {
        headers: { 'Content-Type': contentType },
      });
    }

    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
