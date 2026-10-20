import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-2">404 - Nie znaleziono strony</h1>
      <p className="text-gray-600 mb-6">Żądana ścieżka nie istnieje w VibeHub.</p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-[#0071E3] text-white font-medium rounded-lg shadow-sm hover:opacity-90 transition"
      >
        Wróć do Dashboardu
      </Link>
    </div>
  );
}
