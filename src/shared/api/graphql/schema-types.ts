type TypeKind =
  | 'OBJECT'
  | 'SCALAR'
  | 'UNION'
  | 'INTERFACE'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL';

type Deprecation = {
  isDeprecated: boolean;
  deprecationReason: string | null;
};

type NameDescription = {
  name: string | null;
  description: string | null;
};

type EnumValue = {
  name: TypeKind;
  description: string | null;
} & Deprecation;

type InputValue = NameDescription & {
  type: Type | null;
  defaultValue: string | null;
};

type Directive = NameDescription & {
  isRepeatable: boolean | null;
  locations: string[];
  args: InputValue[];
};

type Field = NameDescription & {
  args: InputValue[] | null;
  type: Type;
} & Deprecation;

type Type = NameDescription & {
  Type: TypeKind;
  fields: Field[] | null;
  inputFields: InputValue[] | null;
  interfaces: Type[] | null;
  enumValues: EnumValue[] | null;
  possibleTypes: Type[] | null;
  ofType: Type | null;
};

export type GraphqlSchema = {
  __schema: {
    queryType: Type;
    mutationType: Type | null;
    subscriptionType: Type | null;
    directives: Directive[];
    types: Type[];
  };
};
