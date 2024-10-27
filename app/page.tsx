import NutritionConsultant from '@/components/NutritionConsultant';
import { ThemeProvider } from '@/components/theme-provider';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <div className="container mx-auto px-4 py-8">
          <NutritionConsultant />
        </div>
      </main>
    </ThemeProvider>
  );
}