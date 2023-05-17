import {
  Type,
  Field,
  TypeOfType,
  InputValue,
  EnumValue,
} from '@src/shared/api/graphql/schema-types';

export interface Element {
  name: string | null;
  description?: string | null;
  args?: InputValue[] | null;
  type?: TypeOfType;
  fields?: Field[] | null;
  inputFields?: InputValue[] | null;
  interfaces?: Type[] | null;
  enumValues?: EnumValue[] | null;
  possibleTypes?: Type[] | null;
  ofType?: Type | null;
}

interface Props {
  element: Element;
  handleBack: () => void;
  handleType: (type: TypeOfType | undefined) => void;
  handleField: (field: Field) => void;
}

const TypeElement = ({ element, handleBack, handleType, handleField }: Props) => {
  const getName = (obj: TypeOfType | null | undefined): string | undefined => {
    return obj ? (obj.name ? obj.name : obj.ofType ? getName(obj.ofType) : undefined) : undefined;
  };

  return (
    <div>
      <button onClick={handleBack}>back</button>
      <h4>{element.name}</h4>
      <p>{element.description}</p>
      {element.fields &&
        element.fields.map((field) => (
          <li key={field.name}>
            <a onClick={() => handleField(field)}>{field.name}</a>:{' '}
            <a onClick={() => handleType(field.type)}>
              {field.type.kind === 'OBJECT'
                ? field.type.name
                : field.type.kind === 'LIST'
                ? '[' + getName(field.type) + ']'
                : getName(field.type)}
            </a>
          </li>
        ))}
      {element.args && <p>Arguments</p>}
      {element.args &&
        element.args.map((arg) => (
          <li key={arg.name}>
            <a onClick={() => console.log(arg)}>{arg.name}</a>:{' '}
            <a onClick={() => console.log(arg.type)}>{getName(arg.type)}</a>
          </li>
        ))}
      {element.type && <p>Type</p>}
      {element.type && (
        <p>
          <a>{element.type.kind}</a>:{' '}
          <a onClick={() => handleType(element.type)}>
            {element.type.kind === 'OBJECT'
              ? element.type.name
              : element.type.kind === 'LIST'
              ? '[' + getName(element.type) + ']'
              : getName(element.type)}
          </a>
        </p>
      )}
    </div>
  );
};

export default TypeElement;
