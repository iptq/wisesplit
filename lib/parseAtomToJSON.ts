import { PrimitiveAtom, Getter } from "jotai";

export const parseAtomToJSON = <T extends PrimitiveAtom<any>, K extends any>(atomToParse: T, get: Getter): K => {
  const getAtomValue = get(atomToParse);

  if (getAtomValue instanceof Array) {
    return parseAtomArrayToJSON(getAtomValue, get) as K;
  }

  if (getAtomValue instanceof Object) {
    return parseAtomObjectToJSON(atomToParse as PrimitiveAtom<Object>, get) as K;
  }


  return getAtomValue as K;
}


const parseAtomObjectToJSON = <T extends PrimitiveAtom<Object>>(atomObject: T, get: Getter) => {
  const parsed = {} as Record<string, unknown>;
  const getAtomObject = get(atomObject) as Record<string, PrimitiveAtom<unknown>>;
  const itemKeys = Object.keys(getAtomObject);


  itemKeys.forEach((key) => {
    const atomValueToParse = getAtomObject[key];
    parsed[key] = parseAtomToJSON(atomValueToParse, get);
  })

  return parsed;
}

const parseAtomArrayToJSON = <T extends PrimitiveAtom<unknown>[]>(atomArray: T, get: Getter) => {
  return atomArray.map((atomElement) => parseAtomToJSON(atomElement, get));
}

