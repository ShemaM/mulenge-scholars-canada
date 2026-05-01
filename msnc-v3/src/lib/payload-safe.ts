import payload from 'payload'

function safeDocs<T>(result: any): T[] {
  return result?.docs ?? []
}

export async function findSafe(collection: string, options: any = {}) {
  try {
    const result = await payload.find({
      collection,
      ...options,
    })

    return {
      docs: safeDocs(result),
      totalDocs: result?.totalDocs ?? 0,
    }
  } catch (error) {
    console.error(`[Payload Error] ${collection}:`, error)
    return {
      docs: [],
      totalDocs: 0,
    }
  }
}