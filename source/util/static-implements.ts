//


export function staticImplements<C>(): (clazz: C) => void {
  let decorator = function (clazz: C): void {
  };
  return decorator;
}