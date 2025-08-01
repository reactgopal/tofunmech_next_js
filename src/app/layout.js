
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// custom style 
import "./globals.css";

// Third-Party Libraries
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-drawer/dist/index.css';
import 'swiper/css';
import 'nprogress/nprogress.css';

import ReduxProvider from './providers';
import ClientLayout from "@/components/ClientLayout";
import ProtectedLayout from "@/utils/ProtectedLayout";
import ScrollToTopButton from "@/utils/ScrollToTop";
import SupportPage from "@/utils/SupportPage";


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
        <NextTopLoader
          color="linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))"
          height={3}
          speed={800}
          showSpinner={false}
        />
        <ReduxProvider>
          <ScrollToTopButton />
          <SupportPage />
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