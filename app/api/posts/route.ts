import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).populate('category').sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: { json: () => any; }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const post = await Post.create(data);
    return NextResponse.json(post);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: { json: () => PromiseLike<{ [x: string]: any; id: any; }> | { [x: string]: any; id: any; }; }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id, ...data } = await request.json();
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(post);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: { url: string | URL; }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}