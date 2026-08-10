export const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/15eIqIsGE4w1evGyXALD2MjGEONbvWzDzi7zVGoam6oc/export?format=csv&gid=0";

export const NEWS_LANG_KEYS = ["FR", "EN", "AR", "ZH", "PT"] as const;

export type NewsRow = {
  date: string;
  titles: Partial<Record<(typeof NEWS_LANG_KEYS)[number], string>>;
  source: string;
  href: string;
  image: string;
};

export function parseNewsCsv(text: string): NewsRow[] {
  const rows = parseCsvRows(text);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toUpperCase());
  const indexOf = (name: string) => header.indexOf(name);

  const colDate = indexOf("DATE");
  const colSource = indexOf("SOURCE");
  const colLien = indexOf("LIEN");
  const colImage = indexOf("IMAGE");

  const result: NewsRow[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const titleIndexes = NEWS_LANG_KEYS.map((k) => header.indexOf(k));
    const anyTitle = titleIndexes.some((i) => i >= 0 && (cells[i] ?? "").trim() !== "");
    const href = colLien >= 0 ? (cells[colLien] ?? "").trim() : "";
    if (!anyTitle || !href) continue;

    const titles: NewsRow["titles"] = {};
    NEWS_LANG_KEYS.forEach((k, idx) => {
      const i = titleIndexes[idx];
      if (i >= 0) {
        const val = (cells[i] ?? "").trim();
        if (val) titles[k] = val;
      }
    });

    result.push({
      date: colDate >= 0 ? (cells[colDate] ?? "").trim() : "",
      titles,
      source: colSource >= 0 ? (cells[colSource] ?? "").trim() : "E-MPGT",
      href,
      image: colImage >= 0 ? (cells[colImage] ?? "").trim() : "",
    });
  }

  result.reverse();

  return result;
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

export function getNewsTitle(row: NewsRow, locale: string): string {
  const key = locale.toUpperCase() as (typeof NEWS_LANG_KEYS)[number];
  return row.titles[key] ?? row.titles.FR ?? "E-MPGT";
}

export function youtubeThumb(href: string): string | null {
  const match = href.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

export function isYoutubeHref(href: string): boolean {
  return /youtu\.be\/|youtube\.com\//.test(href);
}