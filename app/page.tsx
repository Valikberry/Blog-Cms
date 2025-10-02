// app/page.js (redirect to dashboard)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}