import {
  ADD_A_ITEM,
  ADD_A_LIST,
  CHECK_COMPLETE,
  DELETE_A_ITEM,
  REMOVE_A_LIST,
  RENAME_LIST,
} from "./types";

const initialState = {
  todoList: [],
  isDecor: "s",
};

const todoListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_A_LIST: {
      const list = payload;
      const todoListUpdate = [...state.todoList];
      todoListUpdate.push(list);
      return { ...state, todoList: todoListUpdate };
    }
    case REMOVE_A_LIST: {
      const idx = payload;
      const todoListUpdate = [...state.todoList];
      todoListUpdate.splice(idx, 1);
      return { ...state, todoList: todoListUpdate };
    }
    case ADD_A_ITEM: {
      const { idx, taskItem } = payload;
      let todoListUpdate = [...state.todoList];
      let openItemsUpdate = [];
      openItemsUpdate.push(taskItem);
      todoListUpdate[idx].openItems = [
        ...todoListUpdate[idx].openItems,
        ...openItemsUpdate,
      ];
      return { ...state, todoList: todoListUpdate };
    }
    case DELETE_A_ITEM: {
      const { idxList, idxItem } = payload;
      let todoListUpdate = [...state.todoList];
      let openItemsUpdate = [...state.todoList[idxList].openItems];
      openItemsUpdate.splice(idxItem, 1);
      todoListUpdate[idxList] = {
        ...todoListUpdate[idxList],
        openItems: openItemsUpdate,
      };
      return { ...state, todoList: todoListUpdate };
    }
    case RENAME_LIST: {
      const { idxList, taskName } = payload;
      let todoListUpdate = [...state.todoList];
      console.log(todoListUpdate);
      todoListUpdate[idxList] = { ...todoListUpdate[idxList], task: taskName };
      console.log(todoListUpdate);
      return { ...state, todoList: todoListUpdate };
    }
    case CHECK_COMPLETE: {
      const { idxList, idxItem, item, checked } = payload;
      console.log(idxList, idxItem, item, checked);
      console.log(state.todoList[idxList].openItems[idxItem]);
      let isDecorUpdate = state.isDecor;
      if (checked) {
        if (state.todoList[idxList].openItems[idxItem] == item && checked) {
          isDecorUpdate = "text__decor";
        }
      } else {
        isDecorUpdate = "";
      }
      return { ...state, isDecor: isDecorUpdate };
    }
    default:
      return state;
  }
};
export default todoListReducer;
