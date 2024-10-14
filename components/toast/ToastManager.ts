class ToastManager {
  private callback: Set<(message: string, second: number) => void> = new Set();

  // 콜백 등록
  initialToast(callback: (message: string, second: number) => void) {
    this.callback.add(callback);
    return () => {
      this.callback.delete(callback);
    };
  }

  // 받은 파라미터로 콜백 실행
  addToast(message: string, second: number = 3) {
    this.callback.forEach((callback) => callback(message, second));
  }
}

export const toastManager = new ToastManager();

export const toast = (message: string, second: number = 3) => {
  toastManager.addToast(message, second);
};
