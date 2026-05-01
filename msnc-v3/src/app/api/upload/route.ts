import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      return NextResponse.json(
        { error: 'Missing BLOB_READ_WRITE_TOKEN' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Invalid file upload' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      )
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `uploads/${Date.now()}-${safeName}`

    const blob = await put(filename, file, {
      access: 'public',
      token,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
    })
  } catch (error: unknown) {
    console.error('Upload failed:', error)

    const message =
      error instanceof Error ? error.message : 'Upload failed'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}