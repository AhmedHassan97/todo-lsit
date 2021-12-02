import { getTodo } from "../../app/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Todo } from "../../app/types";

const TodoItem = () => {
  const { query } = useRouter();
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    const { toDoId } = query;
    getTodo(toDoId as string).then((res) => {
      setTodo(res as any);
    });
    console.log(todo, "asdasdghkajshdkj");
  }, [query]);
  return (
    <div
      className="card lg:card-side bordered ml-10 bg-gray-500 p-4 mt-4"
      style={{ width: "fit-content" }}
    >
      {todo ? (
        <div className="card-body">
          <h2 className="card-title">
            {todo.title.toUpperCase()}{" "}
            <span className="text-sm text-white ml-2">{todo?.date}</span>
          </h2>
          <p>{todo?.description}</p>
          <p className="text-white">{todo?.type}</p>

          <div className="card-actions">
            <span className="btn btn-primary">{todo?.status}</span>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-2 artboard phone">
          <progress
            className="progress progress-primary"
            value="0"
            max="100"
          ></progress>
          <progress
            className="progress progress-primary"
            value="10"
            max="100"
          ></progress>
          <progress
            className="progress progress-primary"
            value="40"
            max="100"
          ></progress>
          <progress
            className="progress progress-primary"
            value="70"
            max="100"
          ></progress>
          <progress
            className="progress progress-primary"
            value="100"
            max="100"
          ></progress>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
