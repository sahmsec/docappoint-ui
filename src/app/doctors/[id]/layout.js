export async function generateMetadata({ params }) {
  return {
    title: 'Doctor Details',
    description: 'View doctor details and book your appointment.',
  };
}

export default function DoctorLayout({ children }) {
  return children;
}
