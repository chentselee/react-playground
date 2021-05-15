import { useActor, useMachine } from "@xstate/react";
import React from "react";
import Article from "src/components/Article";
import { v4 as uuid } from "uuid";
import { assign, createMachine, spawn, SpawnedActorRef } from "xstate";

import PlayGround from "./index";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoMachineContext {
  todo: Todo;
}

type EditEvent = { type: "EDIT"; text: string };

type ToggleEvent = { type: "TOGGLE" };

type TodoMachineEvent = EditEvent | ToggleEvent;

type TodoMachineState = {
  value: "idle";
  context: TodoMachineContext;
};

const todoMachine = createMachine<
  TodoMachineContext,
  TodoMachineEvent,
  TodoMachineState
>(
  {
    initial: "idle",
    states: {
      idle: {
        on: {
          EDIT: { actions: "editTodo" },
          TOGGLE: { actions: "toggleTodo" },
        },
      },
    },
  },
  {
    actions: {
      editTodo: assign({
        todo: (context, event) => ({
          ...context.todo,
          text: (event as EditEvent).text,
        }),
      }),
      toggleTodo: assign({
        todo: (context) => ({
          ...context.todo,
          completed: !context.todo.completed,
        }),
      }),
    },
  }
);

interface TodosMachineContext {
  todos: Todo[];
  todosRef: SpawnedActorRef<TodoMachineEvent>[];
  addingTodo: string;
}

const todosMachine = createMachine<TodosMachineContext>(
  {
    id: "todos",
    context: { todos: [], todosRef: [], addingTodo: "" },
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD: {
            actions: ["addTodo", "clearInput"],
          },
          CHANGE_ADDING_TODO: {
            actions: "changeAddingTodo",
          },
        },
      },
    },
  },
  {
    actions: {
      changeAddingTodo: assign({ addingTodo: (_, event) => event.text }),
      addTodo: assign((context) => {
        const newTodo: Todo = {
          id: uuid(),
          text: context.addingTodo,
          completed: false,
        };
        return {
          ...context,
          todosRef: [
            ...context.todosRef,
            spawn(todoMachine.withContext({ todo: newTodo }), {
              name: `todo-${newTodo.id}`,
            }),
          ],
        };
      }),
      clearInput: assign({ addingTodo: "" }),
    },
  }
);

const Actors = () => {
  const [state, send] = useMachine(todosMachine);
  const { addingTodo, todosRef } = state.context;

  return (
    <PlayGround>
      <Article>
        <input
          type="text"
          value={addingTodo}
          onChange={(e) => send("CHANGE_ADDING_TODO", { text: e.target.value })}
        />
        <button type="button" onClick={() => send("ADD")}>
          add
        </button>
        {todosRef.map((todoRef) => (
          <Actor key={todoRef.id} todoRef={todoRef} />
        ))}
      </Article>
    </PlayGround>
  );
};

const Actor: React.FC<{ todoRef: SpawnedActorRef<TodoMachineEvent> }> = ({
  todoRef,
}) => {
  const [state, send] = useActor(todoRef);
  const { todo } = state.context;

  return (
    <section>
      <input
        type="text"
        value={todo.text}
        onChange={(e) => {
          send({ type: "EDIT", text: e.target.value });
        }}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => send({ type: "TOGGLE" })}
      />
    </section>
  );
};

export default Actors;
