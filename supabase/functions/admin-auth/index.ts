import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, password, code, discount_percent, max_uses } = await req.json();
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "login") {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "generate_coupon") {
      // Generate coupon code like ZARA-XXXX-XXXX
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const randomPart = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      const generatedCode = code || `ZARA-${randomPart(4)}-${randomPart(4)}`;

      const { data, error } = await supabase.from("coupons").insert({
        code: generatedCode.toUpperCase(),
        discount_percent: discount_percent || 10,
        max_uses: max_uses || 1,
      }).select().single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, coupon: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "list_coupons") {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });

      return new Response(JSON.stringify({ coupons: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "toggle_coupon") {
      const { coupon_id, is_active } = await req.json();
      // Re-parse not needed, already destructured above. Use the body params.
      const body = await req.clone().json?.() || {};
      await supabase.from("coupons").update({ is_active: body.is_active }).eq("id", body.coupon_id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete_coupon") {
      const body = await req.clone().json?.() || {};
      await supabase.from("coupons").delete().eq("id", body.coupon_id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
