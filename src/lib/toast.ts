import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  description?: string;
  duration?: number;
  dismissable?: boolean;
}

class Toast {
  public success(message: string, options?: ToastOptions) {
    sonnerToast.success(message, options);
  }

  public error(message: string, options?: ToastOptions) {
    sonnerToast.error(message, options);
  }

  public warning(message: string, options?: ToastOptions) {
    sonnerToast.warning(message, options);
  }

  public info(message: string, options?: ToastOptions) {
    sonnerToast.info(message, options);
  }
}

export const toast = new Toast();
