import IconButton from '@src/components/IconButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classes from './style.module.scss';
import {
  Type,
  Field,
  TypeOfType,
  InputValue,
  EnumValue,
} from '@src/shared/api/graphql/schema-types';
import { useEffect } from 'react';

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
  parentName?: string | null;
  element: Element;
  handleBack: () => void;
  handleType: (type: TypeOfType | undefined | null) => void;
  handleField: (field: Field) => void;
}

const TypeElement = (props: Props) => {
  const { parentName, element, handleBack, handleType, handleField } = props;
  const getName = (obj: TypeOfType | null | undefined): string | undefined => {
    return obj ? (obj.name ? obj.name : obj.ofType ? getName(obj.ofType) : undefined) : undefined;
  };

  const getPerfomedName = (obj: TypeOfType | null | undefined): string | undefined => {
    let typeName: string | null | undefined;
    if (obj) {
      switch (obj.kind) {
        case 'OBJECT':
          typeName = obj.name;
          break;
        case 'LIST':
          typeName = `[${getPerfomedName(obj.ofType)}]`;
          break;
        case 'NON_NULL':
          typeName = `${getPerfomedName(obj.ofType)}!`;
          break;
        case 'SCALAR':
          typeName = obj.name;
          break;

        default:
          typeName = getName(obj);
          break;
      }
    }
    if (typeName) {
      return typeName;
    }
  };

  return (
    <div className={classes.docs}>
      <IconButton
        icon={faChevronLeft}
        iconSize={'sm'}
        onClick={handleBack}
        className={classes.docsBackBtn}
      />
      <p className={classes.docsPrevios}>{parentName}</p>
      <h3 className={classes.docsHeader}>{element.name}</h3>
      <p className={classes.docsDesc}>{element.description}</p>
      {element.fields && (
        <ul className={classes.docsList}>
          {element.fields.map((field) => (
            <li key={field.name}>
              <a onClick={() => handleField(field)} className={classes.docsLinkField}>
                {field.name}
              </a>
              :{' '}
              <a onClick={() => handleType(field.type)} className={classes.docsLinkType}>
                {field.type.kind === 'OBJECT'
                  ? field.type.name
                  : field.type.kind === 'LIST'
                  ? '[' + getName(field.type) + ']'
                  : getName(field.type)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {element.inputFields && (
        <ul className={classes.docsList}>
          <p>Input Fields</p>
          {element.inputFields.map((field) => (
            <li key={field.name}>
              <span>{field.name}</span>:{' '}
              <a onClick={() => handleType(field.type)} className={classes.docsLinkType}>
                {getName(field.type)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {element.args && <h4 className={classes.docsSubHeader}>Arguments</h4>}
      {element.args && (
        <ul className={classes.docsList}>
          {element.args.map((arg) => (
            <li key={arg.name}>
              <span>{arg.name}</span>:{' '}
              <a onClick={() => handleType(arg.type)} className={classes.docsLinkType}>
                {getPerfomedName(arg.type)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {element.type && <h4 className={classes.docsSubHeader}>Type</h4>}
      {element.type && (
        <p>
          <a onClick={() => handleType(element.type)} className={classes.docsLinkType}>
            {getPerfomedName(element.type)}
          </a>
        </p>
      )}
    </div>
  );
};

export default TypeElement;