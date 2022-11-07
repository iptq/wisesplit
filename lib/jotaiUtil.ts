import { atom, Getter, PrimitiveAtom } from "jotai";

export function storedAtom<T>(initial: T) {
  return atom(initial);
}

export function unwrapAtom<T>(get: Getter, obj: T, depth: number = 0): unknown {
  const log = (...s: any) => {
    // console.log(" ".repeat(depth), ...s);
  };
  log("Unwrapping", obj);
  let atom, result;

  // Recursively try to unwrap atoms
  if ((atom = isAtom(obj))) {
    let innerObj = get(atom);
    log("Got atom with obj", innerObj);
    result = unwrapAtom(get, innerObj, depth + 1);
  } else if (Array.isArray(obj)) {
    log("Got array");
    result = obj.map((item) => unwrapAtom(get, item, depth + 1));
  } else if (typeof obj == "object" && obj !== null) {
    log("Got object");
    result = Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        unwrapAtom(get, value, depth + 1),
      ])
    );
  } else {
    log("Got else", typeof obj);
    result = obj;
  }

  log("Result", result);
  return result;
}

function isAtom<T>(obj: T): PrimitiveAtom<unknown> | null {
  if (typeof obj != "object") return null;
  if (obj == null) return null;
  if (obj.constructor != Object) return null;

  // Heuristically check the fields
  if (!("init" in obj && "write" in obj && "read" in obj)) return null;
  return obj;
}
