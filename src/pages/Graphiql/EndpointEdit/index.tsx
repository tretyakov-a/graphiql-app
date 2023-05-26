import btnClasses from '@src/styles/button.module.scss';
import classes from './style.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import IconButton from '@src/components/IconButton';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PopupContext } from '@src/components/Popup/popup-context';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classNames } from '@src/shared/utils';

const EndpointEdit = () => {
  const {
    endpoint,
    actions: { setEndpoint },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [endpointValue, setEndpointValue] = useState(endpoint);
  const { togglePopup, isVisible } = useContext(PopupContext);
  const { t } = useTranslation();

  const handleEndpointChange = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      setEndpointValue(e.target.value);
    }
  };

  const handleEndpointSave = () => {
    dispatch(setEndpoint(endpointValue));
    togglePopup();
  };

  useEffect(() => {
    setEndpointValue(endpoint);
  }, [isVisible, endpoint]);

  return (
    <div className={classes.endpoint}>
      <label htmlFor="endpoint">
        <div className={classes.label}>{t('endpoint')}:</div>
        <div className={classes.field}>
          <div className={classes.input}>
            <input
              ref={inputRef}
              type="text"
              name="endpoint"
              id="endpoint"
              value={endpointValue}
              onChange={handleEndpointChange}
            />
            {endpointValue !== '' && (
              <button
                className={classNames([btnClasses.button, classes.clearBtn])}
                onClick={() => setEndpointValue('')}
              >
                <FontAwesomeIcon icon={faXmark} size="sm" />
              </button>
            )}
          </div>
          <IconButton
            className={classes.saveBtn}
            icon={faFloppyDisk}
            tooltip={{ langKey: 'save' }}
            onClick={handleEndpointSave}
            disabled={endpointValue === endpoint}
          />
        </div>
      </label>
    </div>
  );
};

export default EndpointEdit;
