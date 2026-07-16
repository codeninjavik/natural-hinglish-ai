import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ShieldCheck, X, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  productName: string;
  countryName: string;
  currencySymbol: string;
  originalPrice: number;
  finalPrice: number;
  couponCode?: string | null;
  couponDiscount?: number | null;
  savings: number;
}

const CheckoutModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  productName,
  countryName,
  currencySymbol,
  originalPrice,
  finalPrice,
  couponCode,
  couponDiscount,
  savings,
}: CheckoutModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md"
          onClick={loading ? undefined : onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              disabled={loading}
              aria-label="Close checkout"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-bold">Confirm your order</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Review your order details before payment.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Product</span>
                <span className="font-medium">{productName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Region</span>
                <span className="font-medium">{countryName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Access</span>
                <span className="font-medium">Lifetime</span>
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currencySymbol}{originalPrice}</span>
                </div>
                {couponCode && couponDiscount ? (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5" />
                      {couponCode} ({couponDiscount}% off)
                    </span>
                    <span>-{currencySymbol}{savings}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-base font-bold pt-1">
                  <span>Total</span>
                  <span>{currencySymbol}{finalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Secure payment via Razorpay. No refunds on digital goods.
            </div>

            <Button
              onClick={onConfirm}
              disabled={loading}
              variant="hero"
              size="lg"
              className="w-full rounded-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Opening secure checkout…
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirm & Pay {currencySymbol}{finalPrice}
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
