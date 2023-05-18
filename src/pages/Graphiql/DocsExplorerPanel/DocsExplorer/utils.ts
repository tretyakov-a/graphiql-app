import { TypeOfType } from '@src/shared/api/graphql/schema-types';

export const getNameFromSchema = (obj: TypeOfType | null | undefined): string | undefined => {
  return obj
    ? obj.name
      ? obj.name
      : obj.ofType
      ? getNameFromSchema(obj.ofType)
      : undefined
    : undefined;
};

export const getPerfomedNameFromSchema = (
  obj: TypeOfType | null | undefined
): string | undefined => {
  let typeName: string | null | undefined;
  if (obj) {
    switch (obj.kind) {
      case 'OBJECT':
        typeName = obj.name;
        break;
      case 'LIST':
        typeName = `[${getPerfomedNameFromSchema(obj.ofType)}]`;
        break;
      case 'NON_NULL':
        typeName = `${getPerfomedNameFromSchema(obj.ofType)}!`;
        break;
      case 'SCALAR':
        typeName = obj.name;
        break;
      case 'INPUT_OBJECT':
        typeName = obj.name;
        break;

      default:
        typeName = getNameFromSchema(obj);
        break;
    }
  }
  if (typeName) {
    return typeName;
  }
};
