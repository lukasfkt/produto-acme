import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useTasks, type Task } from "../../hooks/useTasks";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../Input";
import { LinearButton } from "../LinearButton";

import { IoMdClose } from "react-icons/io";
import { toast } from "../../utils/toast";

interface TaskDetailModalProps {
  task?: Task;
  isCreating?: boolean;
}

const taskFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type taskFormInput = z.infer<typeof taskFormSchema>;

export default function TaskDetailModal({
  task,
  isCreating,
}: TaskDetailModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<taskFormInput>({
    resolver: zodResolver(taskFormSchema),
  });
  const { updateTask, createTask, deleteTask } = useTasks();

  const [isFinished, setIsFinished] = useState<boolean>(
    task?.completed || false
  );

  const closeButton = useRef<HTMLButtonElement>(null);

  const handleEditTask = async (data: taskFormInput) => {
    if (!task) return;
    const response = await updateTask({
      uuid: task.uuid,
      title: data.title,
      description: data.description,
      completed: isFinished,
    });
    if (response.success) {
      toast({
        type: "success",
        message: "Tarefa editada com sucesso!",
        label: "Sucesso",
      });
      closeButton.current?.click();
    } else {
      toast({
        type: "error",
        message: "Erro ao editar tarefa!",
        label: "Erro",
      });
    }
  };

  const handleCreateTask = async (data: taskFormInput) => {
    if (!data.title || !data.description) {
      toast({
        type: "error",
        message: "Preencha todos os campos!",
        label: "Erro",
      });
      return;
    }
    const response = await createTask({
      title: data.title,
      description: data.description,
      completed: isFinished,
    });
    if (response.success) {
      toast({
        type: "success",
        message: "Tarefa criada com sucesso!",
        label: "Sucesso",
      });
      setValue("title", "");
      setValue("description", "");
      setIsFinished(false);
      closeButton.current?.click();
    } else {
      toast({
        type: "error",
        message: "Erro ao criar tarefa!",
        label: "Erro",
      });
    }
  };

  const handleDeleteTask = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!task) return;
    const response = await deleteTask(task);
    if (response.success) {
      toast({
        type: "success",
        message: "Tarefa deletada com sucesso!",
        label: "Sucesso",
      });
      closeButton.current?.click();
    } else {
      toast({
        type: "error",
        message: "Erro ao deletar tarefa!",
        label: "Erro",
      });
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          zIndex: "10",
        }}
      />
      <Dialog.Content
        forceMount
        className={
          "z-40 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed bg-white font-poppins max-md:px-5 max-md:py-10 p-14"
        }
      >
        <Dialog.Close hidden ref={closeButton} />
        <button
          onClick={() => closeButton.current?.click()}
          className="absolute top-4 right-4 hover:opacity-80"
        >
          <IoMdClose size={20} />
        </button>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(
            isCreating ? handleCreateTask : handleEditTask
          )}
        >
          <div className="flex items-center gap-2">
            <span className="min-w-[100px] max-w-[100px]">Título</span>
            <Input
              classNamesDiv="!p-3 max-md:min-w-[200px] min-w-[400px]"
              placeholder="Título"
              defaultValue={task?.title ?? ""}
              {...register("title")}
              maxLength={30}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="min-w-[100px] max-w-[100px]">Descrição</span>
            <Input
              classNamesDiv="!p-3 max-md:min-w-[200px] min-w-[400px]"
              placeholder="Descrição"
              defaultValue={task?.description ?? ""}
              {...register("description")}
              maxLength={50}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="min-w-[100px] max-w-[100px]">Concluído</span>
            <input
              className="w-[20px] h-[20px] cursor-pointer"
              type="checkbox"
              checked={isFinished}
              onChange={() => setIsFinished(!isFinished)}
            />
          </div>
          <div className="flex items-center gap-5">
            {isCreating ? (
              <LinearButton disabled={isSubmitting} text="Criar" />
            ) : (
              <>
                <LinearButton disabled={isSubmitting} text="Editar" />{" "}
                <button
                  onClick={handleDeleteTask}
                  disabled={isSubmitting}
                  className="px-4 py-3 w-full shadow-md rounded-[10px] text-white text-center font-comfortaa max-md:!text-base font-bold bg-red-500 disabled:bg-grey-400 hover:opacity-80"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
