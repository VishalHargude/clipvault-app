/**
 * Memory-Safe Client-Side Batch Processing Queue
 * Enforces serial execution so mobile browsers never exhaust RAM during multi-file operations.
 */

export interface BatchItem<T> {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: T;
  error?: string;
}

export class BatchProcessor<T> {
  private queue: BatchItem<T>[] = [];
  private isProcessing = false;
  private processorFn: (file: File, onProgress: (pct: number) => void) => Promise<T>;
  private onUpdate: (queue: BatchItem<T>[]) => void;

  constructor(
    processorFn: (file: File, onProgress: (pct: number) => void) => Promise<T>,
    onUpdate: (queue: BatchItem<T>[]) => void
  ) {
    this.processorFn = processorFn;
    this.onUpdate = onUpdate;
  }

  addFiles(files: File[]) {
    const newItems: BatchItem<T>[] = files.map((file, idx) => ({
      id: `batch_${Date.now()}_${idx}`,
      file,
      status: 'pending',
      progress: 0
    }));

    this.queue.push(...newItems);
    this.notify();
    this.processNext();
  }

  private async processNext() {
    if (this.isProcessing) return;
    const nextItem = this.queue.find(item => item.status === 'pending');
    if (!nextItem) return;

    this.isProcessing = true;
    nextItem.status = 'processing';
    this.notify();

    try {
      const result = await this.processorFn(nextItem.file, (pct) => {
        nextItem.progress = pct;
        this.notify();
      });

      nextItem.status = 'completed';
      nextItem.progress = 100;
      nextItem.result = result;
    } catch (err: any) {
      nextItem.status = 'error';
      nextItem.error = err.message || 'Processing failed.';
    } finally {
      this.isProcessing = false;
      this.notify();
      // Serial execution: trigger next file
      setTimeout(() => this.processNext(), 50);
    }
  }

  private notify() {
    this.onUpdate([...this.queue]);
  }

  clear() {
    this.queue = [];
    this.notify();
  }
}
