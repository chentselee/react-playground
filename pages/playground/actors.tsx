import { useActor, useMachine } from "@xstate/react";
import { Form, Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import Article from "src/components/Article";
import Button from "src/components/Button";
import TextField from "src/components/TextField";
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
}

const todosMachine = createMachine<TodosMachineContext>(
  {
    id: "todos",
    context: { todos: [], todosRef: [] },
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD: {
            actions: ["addTodo", "clearInput"],
          },
        },
      },
    },
  },
  {
    actions: {
      addTodo: assign((context, event) => {
        const newTodo: Todo = {
          id: uuid(),
          text: event.text,
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
    },
  }
);

interface Values {
  todo: string;
}

const initialValues: Values = {
  todo: "",
};

const Actors = () => {
  const formikRef = useRef<FormikProps<Values>>(null);

  const [state, send] = useMachine(todosMachine, {
    actions: {
      clearInput: () => {
        formikRef.current.setFieldValue("todo", "");
      },
    },
  });
  const { todosRef } = state.context;

  return (
    <PlayGround>
      <Article>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={(values) => {
            send({ type: "ADD", text: values.todo });
          }}
        >
          {() => (
            <Form>
              <TextField name="todo" label="Todo" />
              <Button type="submit">Add</Button>
            </Form>
          )}
        </Formik>
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
