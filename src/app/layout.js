import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'DocAppoint - Doctor Appointment Booking',
  description: 'Book appointments with qualified doctors easily and securely.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
