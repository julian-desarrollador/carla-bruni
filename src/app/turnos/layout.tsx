import { BookingLightPageBackground } from "@/components/booking/booking-light-page-background";

export default function TurnosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      <BookingLightPageBackground />
      {children}
    </div>
  );
}
