class ToastManager {
  private callback: Set<(message: string, seconds: number) => void> = new Set();
  public a = 1;

  // 콜백 등록
  initialToast(callback: (message: string, seconds: number) => void) {
    this.callback.add(callback);
    return () => {
      this.callback.delete(callback);
    };
  }

  // 받은 파라미터로 콜백 실행
  addToast(message: string, seconds: number = 3) {
    this.callback.forEach((callback) => callback(message, seconds));
  }
}

export const toastManager = new ToastManager();

export const toast = (message: string, seconds: number = 3) => {
  toastManager.addToast(message, seconds);
};
