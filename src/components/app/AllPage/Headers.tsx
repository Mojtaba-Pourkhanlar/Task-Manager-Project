import { Button } from "@/components/core/Button";

const Headers = ({ onClick, name }: { onClick: () => void; name: string }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{name}</h1>
        <Button
          className="bg-blue-950 border border-white/20"
          onClick={onClick}
          lable={"تسک جدید"}
        />
      </div>
      <hr className="bg-none my-3 border-b-2 border-white/20" />
    </>
  );
};

export default Headers;
