import ollama from "ollama/browser";
import useSWR from "swr";

const f = () => ollama.list();

export const useListModels = () => {
  return useSWR("ollama.list()", () => ollama.list());
};
