import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-zinc-400">Page not found</p>
      <Button className="mt-8" asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
