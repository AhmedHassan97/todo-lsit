import useFirebase from "../../hooks/useFirebase";
import { useStore } from "../../store";
import { useCopyToClipboard } from "usehooks-ts";
import { useRouter } from "next/router";
import { getTodo } from "../../firebase";
import toast from "react-hot-toast";
const Todo = (props: any) => {
  const router = useRouter();
  const { UpdateTodo } = useFirebase();
  const { userId } = useStore();
  const [value, copy] = useCopyToClipboard();

  const handleShare = () => {
    copy(window.location.toString().replace("/todos", "") + "/" + props.id);
    toast.success("text copied to clipboard");
  };
  return (
    <tr key={props.email}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {props.title}
            </div>
            <div className="text-sm text-gray-500">{props.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{props.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={
            props.status === "Active"
              ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-800 text-white"
          }
        >
          {props.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {props.status === "Active" ? (
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => UpdateTodo(props.id, userId)}
          >
            Mark Done
          </button>
        ) : (
          <div>-</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => handleShare()}
        >
          Share
        </button>
      </td>
    </tr>
  );
};

export default Todo;
