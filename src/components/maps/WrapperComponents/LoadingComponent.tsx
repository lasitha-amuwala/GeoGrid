import { Spinner } from "../../Spinner";

export const LoadingComponent = () => (
  <div className="text-5xl w-full h-full justify-center items-center text-center bg-gray-800 flex flex-col gap-7">
    <h1 className=" md:text-7xl font-bold">GeoGrid</h1>
    <Spinner />
  </div>
);
