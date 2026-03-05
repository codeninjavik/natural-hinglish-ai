import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Plus, Trash2, ToggleLeft, ToggleRight, Copy, Loader2, LogOut, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Coupon {
  id: string;
  code: string;
  discount_percent: number;
  is_active: boolean;
  used_count: number;
  max_uses: number;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [generating, setGenerating] = useState(false);
  const [discountPercent, setDiscountPercent] = useState("10");
  const [maxUses, setMaxUses] = useState("1");
  const [customCode, setCustomCode] = useState("");
  const [loadingCoupons, setLoadingCoupons] = useState(false);
  const { toast } = useToast();

  const adminCall = async (action: string, extra: Record<string, any> = {}) => {
    const { data, error } = await supabase.functions.invoke("admin-auth", {
      body: { action, password: storedPassword, ...extra },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { action: "login", password },
      });
      if (error || data?.error) {
        toast({ title: "Wrong Password", description: "Access denied.", variant: "destructive" });
        return;
      }
      setStoredPassword(password);
      setAuthenticated(true);
    } catch {
      toast({ title: "Error", description: "Login failed.", variant: "destructive" });
    } finally {
      setLoginLoading(false);
    }
  };

  const fetchCoupons = async () => {
    setLoadingCoupons(true);
    try {
      const data = await adminCall("list_coupons");
      setCoupons(data.coupons || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCoupons(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchCoupons();
  }, [authenticated]);

  const generateCoupon = async () => {
    setGenerating(true);
    try {
      await adminCall("generate_coupon", {
        discount_percent: parseInt(discountPercent),
        max_uses: parseInt(maxUses),
        code: customCode.trim() || undefined,
      });
      toast({ title: "Coupon Created! 🎉" });
      setCustomCode("");
      fetchCoupons();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const toggleCoupon = async (id: string, active: boolean) => {
    try {
      await adminCall("toggle_coupon", { coupon_id: id, is_active: !active });
      fetchCoupons();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      await adminCall("delete_coupon", { coupon_id: id });
      fetchCoupons();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: code });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Admin Panel</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Enter admin password to continue</p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="rounded-xl"
            />
            <Button variant="hero" className="w-full rounded-full" onClick={handleLogin} disabled={loginLoading || !password}>
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage coupons & discounts</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setAuthenticated(false); setStoredPassword(""); }}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>

        {/* Generate Coupon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 mb-8 shadow-[var(--shadow-soft)]"
        >
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Generate Coupon
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs mb-1 block">Custom Code (optional)</Label>
              <Input
                placeholder="e.g. ZARA-5415GG-JUGH"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                className="rounded-xl font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave empty for auto-generated code</p>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Discount %</Label>
              <Select value={discountPercent} onValueChange={setDiscountPercent}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90].map((v) => (
                    <SelectItem key={v} value={String(v)}>{v}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Max Uses</Label>
              <Input
                type="number"
                min="1"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-end">
              <Button variant="hero" className="w-full rounded-full" onClick={generateCoupon} disabled={generating}>
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Ticket className="w-4 h-4" /> Generate</>}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Coupon List */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">All Coupons</h2>
            <Button variant="outline" size="sm" onClick={fetchCoupons} disabled={loadingCoupons}>
              {loadingCoupons ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
            </Button>
          </div>

          {coupons.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No coupons yet. Generate one above!</p>
          ) : (
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border ${
                    coupon.is_active ? "border-green-500/20 bg-green-500/5" : "border-border bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sm truncate">{coupon.code}</span>
                      <button onClick={() => copyCode(coupon.code)} className="text-muted-foreground hover:text-foreground">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                        {coupon.discount_percent}% OFF
                      </span>
                      <span>Used: {coupon.used_count}/{coupon.max_uses}</span>
                      <span>{new Date(coupon.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleCoupon(coupon.id, coupon.is_active)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title={coupon.is_active ? "Deactivate" : "Activate"}
                    >
                      {coupon.is_active ? (
                        <ToggleRight className="w-6 h-6 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
