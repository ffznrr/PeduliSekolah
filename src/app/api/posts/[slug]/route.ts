import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/db/models/post';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    // Fetch the post from the database based on the slug
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Return the post data in the response
    return NextResponse.json({ data: post });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
