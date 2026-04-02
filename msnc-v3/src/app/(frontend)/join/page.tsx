import { Metadata } from 'next';
import JoinClient from './JoinClient';

export const metadata: Metadata = {
  title: 'Join the Network | MSNC',
  description: 'Apply as a scholar or volunteer mentor to join the Mulenge Scholars Network and access global academic support.',
};

export default function JoinPage() {
  return <JoinClient />;
}
