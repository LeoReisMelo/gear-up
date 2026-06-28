export function sanitizeObject<T extends Record<string, any>>(
  query: T,
): Partial<T> {
  return Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key as keyof T] = value;
      return acc;
    }, {} as Partial<T>);
}
