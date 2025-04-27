"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Create your query client

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <main className="h-screen w-full flex flex-col">
              <div className="p-3">
                <SidebarTrigger />
                {children}
              </div>
            </main>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
