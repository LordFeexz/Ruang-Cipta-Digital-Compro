import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    const APPLY_MATE_URL = import.meta.env.PUBLIC_CAREER_MATE_URL || "https://career-mate.site";
    const DIGITOOL_URL = import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id";
    const BLOG_PRESS_URL = import.meta.env.PUBLIC_BLOG_PRESS_URL || "http://localhost:3002"; // Fallback

    // Read at request time so the target can be changed on the server without a rebuild.
    // Vite inlines `import.meta.env.PUBLIC_*` at build time, which freezes the value into
    // the bundle — process.env is checked first to keep this one runtime-configurable.
    const IORION_URL =
      process.env.IORION_URL ||
      import.meta.env.PUBLIC_IORION_URL ||
      "https://api.iorion.my.id";

    let targetUrl = null;
    if (order_id?.startsWith("AM")) {
      targetUrl = `${APPLY_MATE_URL}/api/transaction/notify`;
    } else if (order_id?.startsWith("BP")) {
      targetUrl = `${BLOG_PRESS_URL}/api/billing/notification`;
    } else if (order_id?.startsWith("DGTL")) {
      targetUrl = `${DIGITOOL_URL}/api/transaction/notification`;
    } else if (order_id?.startsWith("IO")) {
      // Iorion AI issues `IO-<uuid>-<py|tp>`; the suffix is diagnostic only — Iorion
      // routes on the `kind` column of its own transaction row, not on the order_id.
      targetUrl = `${IORION_URL}/webhooks/midtrans`;
    }

    if (!targetUrl) {
      return new Response(JSON.stringify({
        code: 400,
        message: "Invalid order_id prefix. Order ID must start with 'AM', 'BP', 'DGTL', or 'IO'",
        data: null,
        errors: null,
      }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id,
        status_code,
        gross_amount,
        signature_key,
        transaction_status,
        ...body // pass through any other midtrans fields
      }),
    });

    // Check if the response has JSON before trying to parse
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      code: 500,
      message: "Failed to process notification",
      data: null,
      errors: error?.message || "Unknown error",
    }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
};
