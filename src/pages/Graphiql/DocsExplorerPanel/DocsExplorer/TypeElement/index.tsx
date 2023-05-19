import { faChevronLeft, faDotCircle, faCubes, faTags } from '@fortawesome/free-solid-svg-icons';
import classes from './style.module.scss';
import { Field, TypeOfType } from '@src/shared/api/graphql/schema-types';
import { getPerfomedNameFromSchema as getPerfomedName } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DocsElement } from '@src/store/docs-explorer/types';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

interface Props {
  parentName?: string | null;
  element: DocsElement;
  handleBack: () => void;
  handleType: (type: TypeOfType | undefined | null) => void;
  handleField: (field: Field) => void;
}

const TypeElement = (props: Props) => {
  const { parentName, element, handleBack, handleType, handleField } = props;
  const { t } = useTranslation();

  return (
    <div className={classes.docs}>
      <a className={classes.docsPrevios} onClick={handleBack}>
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        <span style={{ marginLeft: '0.5rem' }}>{`${parentName}`}</span>
      </a>
      <h3 className={classes.docsHeader}>{element.name}</h3>
      {element.description && (
        <ReactMarkdown className={classes.docsDesc}>{element.description}</ReactMarkdown>
      )}
      {element.fields && element.fields?.length > 0 && (
        <h4 className={classes.docsSubHeader}>
          <FontAwesomeIcon icon={faCubes} size="sm" /> {t('fields')}
        </h4>
      )}
      {element.fields && element.fields?.length > 0 && (
        <ul className={classes.docsList}>
          {element.fields.map((field) => (
            <li key={field.name} className={classes.docsItem}>
              <a onClick={() => handleField(field)} className={classes.docsLinkField}>
                {field.name}
              </a>
              {field.args && field.args.length > 0 && (
                <>
                  {' ('}
                  {field.args.map((arg) => (
                    <div
                      key={arg.name}
                      className={
                        field.args && field.args.length > 1
                          ? classes.docsMultyArg
                          : classes.docsOneArg
                      }
                    >
                      <span className={classes.docsInfo}>{arg.name}</span>:{' '}
                      <a onClick={() => handleType(arg.type)} className={classes.docsLinkType}>
                        {getPerfomedName(arg.type)}
                      </a>
                    </div>
                  ))}
                  {')'}
                </>
              )}
              :{' '}
              <a onClick={() => handleType(field.type)} className={classes.docsLinkType}>
                {getPerfomedName(field.type)}
              </a>
              {field.description && (
                <ReactMarkdown className={classes.docsItemDesc}>{field.description}</ReactMarkdown>
              )}
            </li>
          ))}
        </ul>
      )}
      {element.inputFields && element.inputFields.length > 0 && (
        <h4 className={classes.docsSubHeader}>
          <FontAwesomeIcon icon={faTags} size="sm" />
          {t('inputFields')}
        </h4>
      )}
      {element.inputFields && (
        <ul className={classes.docsList}>
          {element.inputFields.map((field) => (
            <li key={field.name} className={classes.docsItem}>
              <span className={classes.docsInfo}>{field.name}</span>:{' '}
              <a onClick={() => handleType(field.type)} className={classes.docsLinkType}>
                {getPerfomedName(field.type)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {element.args && element.args.length > 0 && (
        <h4 className={classes.docsSubHeader}>
          <FontAwesomeIcon icon={faTags} size="sm" /> {t('arguments')}
        </h4>
      )}
      {element.args && (
        <ul className={classes.docsList}>
          {element.args.map((arg) => (
            <li key={arg.name} className={classes.docsItem}>
              <span className={classes.docsInfo}>{arg.name}</span>:{' '}
              <a onClick={() => handleType(arg.type)} className={classes.docsLinkType}>
                {getPerfomedName(arg.type)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {element.type && (
        <h4 className={classes.docsSubHeader}>
          <FontAwesomeIcon icon={faDotCircle} size="sm" /> {t('type')}
        </h4>
      )}
      {element.type && (
        <a onClick={() => handleType(element.type)} className={classes.docsLinkType}>
          {getPerfomedName(element.type)}
        </a>
      )}
      {element.isDeprecated && <p className={classes.docsWarning}>Depricated</p>}
    </div>
  );
};

export default TypeElement;
