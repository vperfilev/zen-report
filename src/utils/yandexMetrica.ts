export default function ym(method: string, value: string): void {
    const w = window as any;
    if (w.ym) {
      w.ym(76817104, method, value);
    }
  }