import { firstValueFrom, type Observable } from 'rxjs'

export interface RenderResult {
  html: string
}

/**
 * Collapse a view stream to its first emitted HTML string.
 *
 * Skeleton only — the real server will stream chunks to the Response as the
 * view Observable emits, rather than awaiting a single value.
 */
export async function renderToString(view$: Observable<string>): Promise<RenderResult> {
  const html = await firstValueFrom(view$)
  return { html }
}
