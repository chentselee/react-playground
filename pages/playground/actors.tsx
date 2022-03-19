import { useActor, useMachine } from "@xstate/react";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef } from "react";
import Article from "src/components/Article";
import Button from "src/components/Button";
import TextField from "src/components/TextField";
import { getLayout } from "src/layouts/Playground";
import { v4 as uuid } from "uuid";
import {
  assign,
  createMachine,
  sendParent,
  sendUpdate,
  spawn,
  SpawnedActorRef,
} from "xstate";

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
          EDIT: {
            actions: ["editTodo", sendUpdate(), sendParent("PERSIST")],
          },
          TOGGLE: {
            actions: ["toggleTodo", sendUpdate(), sendParent("PERSIST")],
          },
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

type HydrateEvent = { type: "HYDRATE"; todos: Todo[] };

type PersistEvent = { type: "PERSIST" };

type AddEvent = { type: "ADD"; text: string };

type TodosMachineEvent = HydrateEvent | PersistEvent | AddEvent;

interface TodosMachineContext {
  todosRef: SpawnedActorRef<TodoMachineEvent>[];
}

const todosMachine = createMachine<TodosMachineContext, TodosMachineEvent>(
  {
    id: "todos",
    context: { todosRef: [] },
    initial: "hydrating",
    states: {
      hydrating: {
        on: {
          HYDRATE: {
            target: "idle",
            actions: "setTodos",
          },
        },
      },
      idle: {
        on: {
          ADD: {
            actions: ["addTodo", "clearInput", "persist"],
          },
          PERSIST: { actions: "persist" },
        },
      },
    },
  },
  {
    actions: {
      setTodos: assign({
        todosRef: (_, event) =>
          (event as HydrateEvent).todos.map((todo) =>
            spawn(todoMachine.withContext({ todo }), {
              name: `todo-${todo.id}`,
            })
          ),
      }),
      addTodo: assign((context, event) => {
        const newTodo: Todo = {
          id: uuid(),
          text: (event as AddEvent).text,
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
      persist: (context) => {
        localStorage.setItem(
          "todos",
          JSON.stringify(
            // @ts-expect-error
            context.todosRef.map((todoRef) => todoRef.state.context.todo)
          )
        );
      },
    },
  });
  const { todosRef } = state.context;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const todos = localStorage.getItem("todos");
      send("HYDRATE", { todos: todos ? JSON.parse(todos) : [] });
    }
  }, [send]);

  return (
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

Object.assign(Actors, { getLayout });

export default Actors;
