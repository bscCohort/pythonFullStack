// The page shell: header on top, page in the middle, footer at the bottom.
// Only the middle part changes when you navigate.
import { Toaster } from "react-hot-toast";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <AppRoutes />
      </main>

      <Footer />

      {/*
        One <Toaster /> for the whole app.

        Anywhere in the code you can now write:
            toast.success("Saved.")
            toast.error("Something went wrong.")

        and a small message slides into the corner and fades out on its own.
        No banner state to hold, nothing left stale on the screen, and it does
        not push the page around while you read it.
      */}
      <Toaster
        position="bottom-right"
        toastOptions={{ duration: 3000 }}
      />
    </div>
  );
}
