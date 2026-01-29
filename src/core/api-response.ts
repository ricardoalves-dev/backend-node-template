export class ApiResponse<T> {
  data?: T;
  get numberOfRecords(): number {
    if (Array.isArray(this.data)) return this.data.length;
    if (!this.data) return 0;

    return 1;
  }

  toJSON(): Record<string, unknown> {
    return {
      data: this.data ?? {},
      numberOfRecords: this.numberOfRecords,
    };
  }
}
