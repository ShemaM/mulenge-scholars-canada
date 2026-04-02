'use server';

import { getCachedPayload } from '@/lib/payload';

export async function upsertEvent(formData: FormData, id?: string) {
  const data: any = Object.fromEntries(formData);

  // Convert eventDate from datetime-local string to ISO date
  if (data.eventDate) {
    data.eventDate = new Date(data.eventDate as string).toISOString();
  }

  const payload = await getCachedPayload();

  try {
    if (id) {
      await payload.update({
        collection: 'events',
        id,
        data,
      });
    } else {
      await payload.create({
        collection: 'events',
        data,
      });
    }
  } catch (error) {
    console.error('Failed to upsert event:', error);
    throw error;
  }
}

export async function upsertProgram(formData: FormData, id?: string) {
  const data: any = Object.fromEntries(formData);

  const payload = await getCachedPayload();

  try {
    if (id) {
      await payload.update({
        collection: 'programs',
        id,
        data,
      });
    } else {
      await payload.create({
        collection: 'programs',
        data,
      });
    }
  } catch (error) {
    console.error('Failed to upsert program:', error);
    throw error;
  }
}

export async function deleteEvent(id: string) {
  const payload = await getCachedPayload();

  try {
    await payload.delete({
      collection: 'events',
      where: {
        id: {
          equals: id,
        },
      },
    });
  } catch (error) {
    console.error('Failed to delete event:', error);
    throw error;
  }
}

export async function deleteProgram(id: string) {
  const payload = await getCachedPayload();

  try {
    await payload.delete({
      collection: 'programs',
      where: {
        id: {
          equals: id,
        },
      },
    });
  } catch (error) {
    console.error('Failed to delete program:', error);
    throw error;
  }
}
