import Link from "next/link";

type QueryValue = string | undefined;
type QueryMap = Record<string, QueryValue>;

function withQuery(pathname: string, current: QueryMap, next: QueryMap): string {
  const merged = { ...current, ...next };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (!value) continue;
    params.set(key, value);
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function QueryChips(props: {
  pathname: string;
  current: QueryMap;
  queryKey: string;
  values: string[];
  activeValue?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={withQuery(props.pathname, props.current, { [props.queryKey]: undefined, page: undefined })}
        className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
          !props.activeValue
            ? "border-primary/50 bg-primary/10 text-primary"
            : "border-border/50 bg-secondary/50 text-muted-foreground hover:text-foreground"
        }`}
      >
        All
      </Link>
      {props.values.map((value) => (
        <Link
          key={value}
          href={withQuery(props.pathname, props.current, { [props.queryKey]: value, page: undefined })}
          className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
            props.activeValue === value
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border/50 bg-secondary/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          {value}
        </Link>
      ))}
    </div>
  );
}

export function Pagination(props: {
  pathname: string;
  current: QueryMap;
  currentPage: number;
  totalPages: number;
}) {
  if (props.totalPages <= 1) return null;

  const previousPage = props.currentPage > 1 ? props.currentPage - 1 : null;
  const nextPage = props.currentPage < props.totalPages ? props.currentPage + 1 : null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
      {previousPage ? (
        <Link
          href={withQuery(props.pathname, props.current, { page: String(previousPage) })}
          className="rounded-md border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm text-foreground"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-border/40 bg-secondary/20 px-3 py-1.5 text-sm text-muted-foreground">
          Previous
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        Page {props.currentPage} of {props.totalPages}
      </span>
      {nextPage ? (
        <Link
          href={withQuery(props.pathname, props.current, { page: String(nextPage) })}
          className="rounded-md border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm text-foreground"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-border/40 bg-secondary/20 px-3 py-1.5 text-sm text-muted-foreground">
          Next
        </span>
      )}
    </nav>
  );
}
