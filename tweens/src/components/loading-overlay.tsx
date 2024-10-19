export default function LoadingOverlay({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[32rem] flex-col items-center gap-6 rounded-xl border-2 bg-white px-6 py-16 shadow-lg">
        <video src="/loading.mov" autoPlay loop className="w-32" />
        <span className="text-xl text-gray-500">{text}</span>
      </div>
    </div>
  );
}
