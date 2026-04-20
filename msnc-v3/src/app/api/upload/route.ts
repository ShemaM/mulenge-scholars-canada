import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const blob = await put(
      'uploads/example.txt',
      new Blob(['Hello Blob!'], {
        type: 'text/plain',
      }),
      {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      },
    )

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error('Upload failed:', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}
