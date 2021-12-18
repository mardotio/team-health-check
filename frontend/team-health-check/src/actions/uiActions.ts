import actionCreator, { Actions } from '../util/actionCreator';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const CLOSE_MODALS = 'CLOSE_MODALS';

const uiActions = {
  openModal: (payload: string) => actionCreator(OPEN_MODAL, payload),
  closeModal: (payload: string) => actionCreator(CLOSE_MODAL, payload),
  closeModals: () => actionCreator(CLOSE_MODALS),
};

export type UiActions = Actions<typeof uiActions>;

export const { openModal, closeModal, closeModals } = uiActions;
