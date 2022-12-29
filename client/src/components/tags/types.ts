export interface IState {
  tags: string[];
  disabled: number[];
}

export interface IAction {
  type: ACTIONS;
  payload?: { tag?: string; newTag?: string; tags?: string[]; index?: number };
}

export enum ACTIONS {
  INIT_TAGS = "init",
  ADD_TAG = "add",
  EDIT_TAG = "edit",
  REMOVE_TAG = "remove",
  DISABLED_TAG = "disable",
}
