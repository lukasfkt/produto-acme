import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import Header from "../../components/Header";
import { SearchInput } from "../../components/SearchInput";
import { useTasks } from "../../hooks/useTasks";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LinearButton } from "../../components/LinearButton";
import Loading from "../../components/Loading";
import TaskDetailModal from "../../components/TaskDetailModal";

export default function HomePage() {
  const { listTasks, tasks, pagination } = useTasks();

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<{
    current: number;
    next: any[];
    previous: any[];
  }>();

  const listTasksFirstPage = useCallback(async () => {
    setIsLoading(true);
    await listTasks(1);
    setIsLoading(false);
  }, [listTasks]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    var current = 0;
    var next = [];
    var previous = [];
    const MAX_PAGE = 1;
    if (pagination) {
      for (
        let i = pagination.currentPage;
        i <= pagination.currentPage + MAX_PAGE;
        i++
      ) {
        if (i > pagination.totalPages) break;
        if (pagination.currentPage === i) {
          current = i;
        }
        if (pagination.currentPage < i) {
          next.push(i);
        }
      }
      for (
        let i = pagination.currentPage;
        i >= pagination.currentPage - MAX_PAGE;
        i--
      ) {
        if (i <= 0) break;
        if (pagination.currentPage > i) {
          previous.unshift(i);
        }
      }
      if (pagination.currentPage > MAX_PAGE + 1) {
        previous.unshift("...");
        previous.unshift(1);
      }
      if (pagination.totalPages - pagination.currentPage > MAX_PAGE) {
        next.push("...");
        next.push(pagination.totalPages);
      }
    }
    setPage({ current: current, next: next, previous: previous });
  }, [pagination]);

  useEffect(() => {
    listTasksFirstPage();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!isSearching) return;
      setIsLoading(true);
      const currentPage = pagination.currentPage;
      if (search) {
        await listTasks(currentPage, search);
      } else {
        await listTasks(currentPage);
      }
      setIsLoading(false);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, isSearching, pagination]);

  const handleSelectPage = useCallback(
    async (selectedPage: number) => {
      setIsLoading(true);
      listTasks(selectedPage);
      setIsLoading(false);
    },
    [listTasks]
  );

  return (
    <section>
      <Header />
      <div className="mt-[100px] px-[8.444vw]">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start gap-y-5">
          <h1 className="font-bold text-primary-blue text-lg">Tasks</h1>
          <SearchInput
            placeholder={"Pesquisar tarefas..."}
            onChange={(e) => {
              setIsSearching(true);
              setSearch(e.target.value);
            }}
            value={search}
            showSearchIcon
            classNamesDiv="w-[300px]"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full max-h-[600px] overflow-y-auto mt-10">
              <table className="text-azulfy-rich-black font-comfortaa w-full">
                <thead>
                  <tr className="border-b border-grey-700 border-opacity-20">
                    <th className="font-bold text-start py-2 max-lg:text-sm max-md:text-xs">
                      Titulo
                    </th>
                    <th className="font-bold text-start py-2 max-lg:text-sm max-md:text-xs">
                      Descrição
                    </th>
                    <th className="font-bold text-start py-2 max-lg:text-sm max-md:text-xs">
                      Concluido?
                    </th>
                  </tr>
                </thead>
                <tbody className="px-10">
                  {tasks?.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-5">
                        Nenhuma tarefa encontrada
                      </td>
                    </tr>
                  ) : (
                    <>
                      {tasks?.map((task, index) => {
                        return (
                          <tr
                            key={task?.uuid || index}
                            className="border-b border-grey-700 border-opacity-20"
                          >
                            <td className="py-5 px-1 max-lg:text-sm max-md:text-xs break-all">
                              {task?.title}
                            </td>
                            <td className="py-5 px-1 max-lg:text-sm max-md:text-xs break-all">
                              {task?.description}
                            </td>
                            <td className="py-5 px-1 max-lg:text-sm max-md:text-xs break-all">
                              {task?.completed ? (
                                <span className="font-bold text-green-500">
                                  SIM
                                </span>
                              ) : (
                                <span className="font-bold text-red-500">
                                  NÃO
                                </span>
                              )}
                            </td>
                            <td>
                              <Dialog.Root>
                                <Dialog.Trigger
                                  className="hover:opacity-70"
                                  type="button"
                                >
                                  <MdKeyboardArrowRight size={24} />
                                </Dialog.Trigger>
                                <TaskDetailModal task={task} />
                              </Dialog.Root>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col max-md:gap-3 pb-6">
              {tasks?.length > 0 && (
                <footer className="flex justify-center items-center gap-3 py-2 mt-5">
                  {pagination && (
                    <>
                      {page?.previous && page?.previous?.length > 0 && (
                        <button
                          disabled={page?.previous?.length === 0}
                          onClick={() =>
                            handleSelectPage((page?.current || 2) - 1)
                          }
                          className="text-primary-rich-black font-raleway hover:opacity-70 disabled:opacity-50"
                        >
                          Prev
                        </button>
                      )}

                      {page?.previous.map((page) => {
                        return (
                          <button
                            onClick={() => handleSelectPage(page)}
                            className="border border-[#F1F1F1] flex items-center justify-center rounded-md font-raleway w-8 h-8 hover:opacity-70"
                            key={page}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        className={`hidden ${
                          page?.previous &&
                          page?.previous?.length > 0 &&
                          `!flex`
                        } ${
                          page?.next && page?.next?.length > 0 && `!flex`
                        } bg-primary-blue hover:bg-primary-blue-hover active:bg-primary-blue-pressed text-white flex items-center justify-center rounded-md font-raleway w-8 h-8`}
                      >
                        {page?.current}
                      </button>
                      {page?.next.map((page) => {
                        if (typeof page === "string") {
                          return (
                            <span
                              className="text-primary-rich-black px-[10px]"
                              key={page}
                            >
                              {page}
                            </span>
                          );
                        } else {
                          return (
                            <button
                              onClick={() => handleSelectPage(page)}
                              className="border border-[#F1F1F1] flex items-center justify-center rounded-md font-raleway w-8 h-8 hover:opacity-70"
                              key={page}
                            >
                              {page}
                            </button>
                          );
                        }
                      })}
                      {page?.next && page?.next?.length > 0 && (
                        <button
                          disabled={page?.next?.length === 0}
                          onClick={() =>
                            handleSelectPage((page?.current || 0) + 1)
                          }
                          className="text-primary-rich-black font-raleway hover:opacity-70 disabled:opacity-50"
                        >
                          Next
                        </button>
                      )}
                    </>
                  )}
                </footer>
              )}
              <div className="flex w-full justify-end">
                <div className="w-[300px] max-md:w-full">
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <LinearButton textSize="16" text="Criar nova task" />
                    </Dialog.Trigger>
                    <TaskDetailModal isCreating />
                  </Dialog.Root>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
