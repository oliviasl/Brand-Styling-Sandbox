import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
        <Loader2 className="h-16 w-16 animate-spin" />
        <span className="text-2xl font-medium text-gray-700">{text}</span>
      </div>
    </div>
  );
}
