export type SearchParams = Record<string, string | string[] | undefined>;

export function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export function parsePage(value: string | string[] | undefined): number {
  const first = firstQueryValue(value);
  const parsed = Number.parseInt(first, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export function toQueryMap(params: SearchParams): Record<string, string | undefined> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, firstQueryValue(value) || undefined])
  );
}
