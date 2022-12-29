import { ACTIONS, IAction, IState } from "./types";

export function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INIT_TAGS:
      return {
        tags: action.payload?.tags as string[],
        disabled: action.payload?.tags?.map((x: string, i: number) => {
          return i;
        }) as number[],
      };
    case ACTIONS.ADD_TAG:
      return {
        tags: state.tags.includes("")
          ? state.tags
          : ([...state.tags, ""] as string[]),
        disabled: state.disabled,
      };
    case ACTIONS.REMOVE_TAG:
      return {
        tags: state.tags.filter((x: string) => !payload?.tags?.includes(x)),
        disabled: state.tags
          .filter((x: string) => !payload?.tags?.includes(x))
          .map((x: string, i: number) => {
            return i;
          }) as number[],
      };
    case ACTIONS.EDIT_TAG:
      return {
        tags: state.tags.map((x: string, i: number) => {
          if (x == payload?.tag && i == payload?.index) {
            return payload?.newTag;
          }
          return x;
        }) as string[],
        disabled: state.disabled,
      };
    case ACTIONS.DISABLED_TAG:
      return {
        tags: state.tags,
        disabled: state.disabled.includes(payload?.index!)
          ? state.disabled.filter((x: number) => x !== payload?.index)
          : [...state.disabled, payload?.index!],
      };
    default:
      return state;
  }
}
