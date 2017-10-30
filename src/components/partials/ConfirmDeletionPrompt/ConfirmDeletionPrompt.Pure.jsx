import React from 'react';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from 'aesthetic';
import Modal from 'react-modal';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import FormButton from '../../Atomic/FormButton';
import PaperShredderGlyph from '../../../constants/svg/PaperShredderGlyph';
import ConfirmationModalStyles from '../../../constants/json/ConfirmationModalStyles.json';

const ConfirmDeletionPromptPure = ({
  classNames,
  deleteEvt,
  disableModal,
  isPromptOpen,
  withMultipleItems,
}) => (
  <Modal
    closeTimeoutMS={500}
    contentLabel="ConfirmDeletionPrompt"
    isOpen={isPromptOpen}
    portalClassName={classNames.modalPortalContainer}
    style={ConfirmationModalStyles}
  >
    <form
      className={classNames.confirmationPromptForm}
      name="delete-confirmation-form"
    >
      <header className={classNames.confirmationPromptHeaderWrapper}>
        <div className={classNames.confirmationPromptGlyphWrapper}>
          <PaperShredderGlyph />
        </div>
        <h3 className={classNames.confirmationPromptHeader}>
          {`Delete Event${!!withMultipleItems ? 's' : ''}`}
        </h3>
      </header>
      <hr className={classNames.confirmationPromptLineDivider} />
      <p className={classNames.confirmationPromptMessage}>
        {`Are you sure you want to delete ${!!withMultipleItems ? 'these' : 'this'} event${!!withMultipleItems ? 's' : ''}?`}
      </p>
      <div className={classNames.confirmationPromptWarningNoteWrapper}>
        <WarningIcon className={classNames.confirmationPromptWarningIcon} />
        <p className={classNames.confirmationPromptWarningNote}>This action cannot be undone.</p>
      </div>
      <div className={classNames.confirmationPromptButtonsWrapper}>
        <FormButton
          buttonText="Cancel"
          clickHandler={disableModal}
          name="cancelEventConfirmationButton"
        />
        <FormButton
          buttonText="Delete"
          name="deleteEventConfirmationButton"
          clickHandler={() => {
            deleteEvt();
            return disableModal();
          }}
        />
      </div>
    </form>
  </Modal>
);

ConfirmDeletionPromptPure.displayName = 'ConfirmDeletionPrompt';

ConfirmDeletionPromptPure.propTypes = {
  classNames: ClassNamesPropType.isRequired,
  deleteEvt: PropTypes.func.isRequired,
  disableModal: PropTypes.func.isRequired,
  isPromptOpen: PropTypes.bool,
  withMultipleItems: PropTypes.bool,
};

ConfirmDeletionPromptPure.defaultProps = {
  isPromptOpen: false,
  withMultipleItems: false,
};

export default ConfirmDeletionPromptPure;
