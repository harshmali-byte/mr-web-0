import React from 'react';
import dynamic from 'next/dynamic';

const PublicLayout = dynamic(() => import('../components/Public/Layout/PublicLayout'));
const Contact = dynamic(() => import('../components/Public/ContactUs/Contact'));

export default function ContactUsPage() {
  return (
    <PublicLayout>
      <Contact />
    </PublicLayout>
  );
}
