/**
 * Boîte mail de développement — serveur SMTP local + inbox web.
 *
 * Usage :  node tools/dev-mailbox.mjs
 *   SMTP : smtp://localhost:1025
 *   Inbox: http://localhost:8025
 *
 * Sert à vérifier la chaîne complète « formulaire → serveur → e-mail »
 * sans dépendre d'un fournisseur d'e-mail réel.
 * NE PAS utiliser en production.
 */
import { createServer } from "node:net";
import { createServer as createHttpServer } from "node:http";

const SMTP_PORT = Number(process.env.DEV_MAIL_SMTP_PORT || 1025);
const HTTP_PORT = Number(process.env.DEV_MAIL_HTTP_PORT || 8025);

/** @type {{id:number,from:string,to:string[],subject:string,date:string,raw:string}[]} */
const messages = [];
let counter = 0;

// ─────────────────────────────── SMTP ───────────────────────────────
const smtp = createServer((socket) => {
  let buffer = "";
  let inData = false;
  let dataBuffer = "";
  let from = "";
  const to = [];

  const send = (line) => socket.write(`${line}\r\n`);

  send("220 dev-mailbox ESMTP E-MPGT");

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");

    let index;
    while ((index = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 2);

      if (inData) {
        if (line === ".") {
          inData = false;
          counter += 1;
          messages.push({
            id: counter,
            from,
            to: [...to],
            subject: "",
            date: new Date().toISOString(),
            raw: dataBuffer,
          });
          // extrait les en-têtes pour l'affichage
          const last = messages[messages.length - 1];
          for (const header of dataBuffer.split(/\r?\n/)) {
            if (/^subject:/i.test(header)) {
              last.subject = decodeMime(
                header.replace(/^subject:\s*/i, "").trim()
              );
            }
          }
          console.log(
            `✉  [${last.id}] ${last.subject || "(sans objet)"} → ${last.to.join(", ")}`
          );
          dataBuffer = "";
          send("250 2.0.0 Ok: queued");
        } else {
          dataBuffer += `${line}\n`;
        }
        continue;
      }

      const upper = line.toUpperCase();
      if (upper.startsWith("EHLO") || upper.startsWith("HELO")) {
        send("250-dev-mailbox greets you");
        send("250-8BITMIME");
        send("250-SMTPUTF8");
        send("250 SIZE 10485760");
      } else if (upper.startsWith("MAIL FROM")) {
        from = line.slice(line.indexOf(":") + 1).trim().replace(/[<>]/g, "");
        send("250 2.1.0 Ok");
      } else if (upper.startsWith("RCPT TO")) {
        to.push(line.slice(line.indexOf(":") + 1).trim().replace(/[<>]/g, ""));
        send("250 2.1.5 Ok");
      } else if (upper === "DATA") {
        inData = true;
        send("354 End data with <CR><LF>.<CR><LF>");
      } else if (upper === "RSET") {
        from = "";
        to.length = 0;
        send("250 2.0.0 Ok");
      } else if (upper === "NOOP") {
        send("250 2.0.0 Ok");
      } else if (upper === "QUIT") {
        send("221 2.0.0 Bye");
        socket.end();
      } else {
        send("250 2.0.0 Ok");
      }
    }
  });

  socket.on("error", () => {});
});

smtp.listen(SMTP_PORT, () => {
  console.log(`📮 SMTP   : smtp://localhost:${SMTP_PORT}`);
});

// ─────────────────────────────── Inbox web ───────────────────────────────
const escape = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Décode les mots encodés MIME (=?UTF-8?Q?...?= / =?UTF-8?B?...?=). */
const decodeMime = (s) =>
  String(s ?? "").replace(
    /=\?([^?]+)\?([QqBb])\?([^?]*)\?=/g,
    (_m, charset, encoding, data) => {
      try {
        if (encoding.toUpperCase() === "B") {
          return Buffer.from(data, "base64").toString("utf8");
        }
        // Q-encoding : les séquences =XX sont des OCTETS UTF-8, pas du latin-1.
        const bytes = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i] === "_") {
            bytes.push(0x20);
          } else if (
            data[i] === "=" &&
            /^[0-9A-Fa-f]{2}$/.test(data.slice(i + 1, i + 3))
          ) {
            bytes.push(parseInt(data.slice(i + 1, i + 3), 16));
            i += 2;
          } else {
            bytes.push(data.charCodeAt(i) & 0xff);
          }
        }
        return new TextDecoder("utf-8").decode(new Uint8Array(bytes));
      } catch {
        return data;
      }
    }
  );

const http = createHttpServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${HTTP_PORT}`);

  if (url.pathname === "/") {
    const rows = messages
      .map(
        (m) => `<tr>
        <td>${m.id}</td>
        <td><a href="/m/${m.id}">${escape(m.subject || "(sans objet)")}</a></td>
        <td>${escape(m.from)}</td>
        <td>${escape(m.to.join(", "))}</td>
        <td>${new Date(m.date).toLocaleString("fr-FR")}</td>
      </tr>`
      )
      .join("");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Boîte mail E-MPGT (dev)</title>
<style>
 body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:32px;background:#f5f7fa;color:#13223d}
 h1{font-size:20px;margin:0 0 4px} p.sub{color:#5a6678;margin:0 0 24px;font-size:14px}
 table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e1e6ee;border-radius:14px;overflow:hidden}
 th,td{text-align:left;padding:12px 16px;border-bottom:1px solid #e1e6ee;font-size:14px}
 th{background:#f5f7fa;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#5a6678}
 a{color:#2a3579;font-weight:600;text-decoration:none} a:hover{text-decoration:underline}
 pre{background:#fff;border:1px solid #e1e6ee;border-radius:14px;padding:20px;white-space:pre-wrap;font-size:13px;line-height:1.6}
 .empty{padding:40px;text-align:center;color:#5a6678}
</style></head><body>
<h1>📮 Boîte mail de développement — E-MPGT</h1>
<p class="sub">${messages.length} message(s) reçu(s) — la boîte se vide au redémarrage du serveur.</p>
${
  messages.length
    ? `<table><thead><tr><th>#</th><th>Objet</th><th>De</th><th>Pour</th><th>Reçu le</th></tr></thead><tbody>${rows}</tbody></table>`
    : `<div class="empty">Aucun message pour le moment. Soumettez le formulaire de contact.</div>`
}
</body></html>`);
    return;
  }

  const match = url.pathname.match(/^\/m\/(\d+)$/);
  if (match) {
    const message = messages.find((m) => m.id === Number(match[1]));
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Message #${match[1]}</title>
<style>
 body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:32px;background:#f5f7fa;color:#13223d}
 h1{font-size:18px;margin:0 0 20px} pre{background:#fff;border:1px solid #e1e6ee;border-radius:14px;padding:20px;white-space:pre-wrap;font-size:13px;line-height:1.6}
 a{color:#2a3579;font-weight:600}
</style></head><body>
<h1>Message #${match[1]} — <a href="/">← Retour à la boîte</a></h1>
<pre>${escape(message ? message.raw : "Message introuvable")}</pre>
</body></html>`);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404");
});

http.listen(HTTP_PORT, () => {
  console.log(`📬 Inbox  : http://localhost:${HTTP_PORT}`);
});
