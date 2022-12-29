import { ACTIONS, IAction, IState } from "./types";

export function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INIT_TAGS:
      return {
        tags: action.payload?.tags as string[],
        disabled: action.payload?.tags?.map((x, i: number) => {
          return i;
        }) as number[],
      };
    case ACTIONS.ADD_TAG:
      return {
        tags: state.tags.includes("") ? state.tags : ["", ...state.tags],
        disabled: state.tags.includes("")
          ? state.disabled
          : state.disabled.map((x: number) => x + 1),
      };
    case ACTIONS.REMOVE_TAG:
      return {
        tags: state.tags.filter((x, i: number) => state.disabled.includes(i)),
        disabled: state.tags.map((x, i: number) => {
          return i;
        }),
      };
    case ACTIONS.EDIT_TAG:
      return {
        tags: state.tags.map((x: string, i: number) => {
          if (x == payload?.tag && payload?.indexes![0] == i) {
            return payload?.newTag;
          }
          return x;
        }) as string[],
        disabled: state.disabled,
      };
    case ACTIONS.DISABLED_TAG:
      return {
        tags: state.tags,
        disabled: payload?.indexes!,
      };
    default:
      return state;
  }
}
