import { useListModels } from "../hooks/use-listmodels";

export const SelectModel = ({ name }: { name?: string }) => {
  const { data, isLoading, error } = useListModels();

  return (
    <>
      <select disabled={isLoading} name={name} className="border p-2">
        {data?.models.map((model) => (
          <>
            <option value={model.name}>{model.name}</option>
          </>
        ))}
      </select>
    </>
  );
};
