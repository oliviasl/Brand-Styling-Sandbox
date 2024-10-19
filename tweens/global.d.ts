// global.d.ts or tailwind.d.ts
declare global {
    interface Window {
      tailwind?: any; // You can specify a more detailed type if you know it
    }
}
  
export {};
  