import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card';

// Define the shape of the data coming from Payload
interface ProgramItem {
  id: string | number;
  title: string;
  description?: string;
  slug?: string;
  // Add other fields as defined in your Payload collection
}

interface ProgramsProps {
  data?: ProgramItem[]; 
}

export default function Programs({ data = [] }: ProgramsProps) {
  // If no data, show a subtle empty state or return null
  if (!data || data.length === 0) return null;

  return (
    <section className="container-editorial">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((program) => (
          <Card key={program.id} className="hover:-translate-y-0.5">
            <CardContent className="p-8">
              <CardTitle className="text-2xl">{program.title}</CardTitle>
              <CardDescription className="mt-3">
                {program.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
