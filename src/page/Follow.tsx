import useFollow, { followEntry } from "@/hooks/useFollow";
import isEmpty from "@/utils/isEmpty";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import empty from "../assets/empty2.jpg";

export default function Follow() {
  const navigate = useNavigate();
  const { follow } = useFollow();

  return (
    <div className="w-full px-5 min-h-screen text-white">
      <div
        className="flex items-center gap-3 mb-5 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        {" "}
        <Icon icon="ph:arrow-left-bold" width={24} />
        <h2 className="text-xl">Following</h2>
      </div>

      {isEmpty(history) ? (
        <div className="flex flex-1 items-center justify-center w-full h-[70vh] flex-col opacity-50">
          <img src={empty} />
          <p className="text-lg">Following list is Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mt-5">
          {Object.entries(follow).map(([mangaId, data], index) => (
            <Card key={index} id={mangaId} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ id, data }: { id: string; data: followEntry }) {
  return (
    <Link
      to={`/book/${id}`}
      className="w-full bg-gray-300 relative rounded-md overflow-hidden"
    >
      <img src={data.cover} className="w-full h-full object-contain" />
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-[#000000] transition-all"></div>
      <p className="absolute bottom-0 text-white text-sm sm:text-md lg:text-lg p-2">
        {data.mangaTitle}
      </p>
    </Link>
  );
}
