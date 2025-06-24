'use client'
import "bootstrap/dist/css/bootstrap.min.css";

import "./globals.css";
import 'swiper/css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReduxProvider from './providers';

import ClientLayout from "@/components/ClientLayout";
import ScrollToTop from "react-scroll-to-top";
import ProtectedLayout from "@/utils/ProtectedLayout";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        {/* <link src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" /> */}
        {/* razor pay  */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <ReduxProvider>
          <ScrollToTop smooth />
          <ClientLayout>
            <ProtectedLayout>
              {children}
            </ProtectedLayout>
            <ToastContainer />
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>

  );
}
