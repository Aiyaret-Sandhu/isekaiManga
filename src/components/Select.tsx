/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { Tag } from "../api/schema";

export default function Select({
  title,
  data,
  state,
  setState,
  type,
}: {
  title: string;
  data: any[];
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  defaultValue?: any;
  type?: "multipleChoice" | "tag" | "order";
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (wrapperRef.current && !wrapperRef.current.contains(target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full relative">
      <p className="mb-2">{title}</p>
      <div
        className="bg-gray-800 py-1 px-2 w-full h-8 rounded-md flex items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        ref={wrapperRef}
      >
        {type == "order" && (
          <span className="line-clamp-1 grow">
            {state ? state.title : "none"}
          </span>
        )}
        {type == "multipleChoice" && (
          <span className="line-clamp-1 grow">
            {state?.length == 0 ? "none" : state.join(", ")}
          </span>
        )}
        {type == "tag" && (
          <span className="line-clamp-1 grow">
            {state?.length == 0
              ? "none"
              : state
                  .map((item: Tag) => {
                    return item.attributes.name.en;
                  })
                  .join(", ")}
          </span>
        )}
        {state == null || state?.length == 0 ? (
          <Icon icon="uil:arrow" rotate={1} />
        ) : (
          <Icon
            icon="ph:x-bold"
            className="shrink-0"
            width={18}
            onClick={() => (type === "order" ? setState(null) : setState([]))}
          />
        )}
      </div>
      {isOpen && (
        <div className="w-full max-h-[300px] overflow-y-auto mt-1 rounded-md bg-gray-900 absolute top-full p-1 z-10">
          {type == "order" &&
            data.map((d, idx) => (
              <div
                key={idx}
                className={`bg-gray-900 py-1 px-2 mb-1 w-full flex items-center rounded-md cursor-pointer ${
                  d == state
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }  `}
                onClick={() => setState(d)}
              >
                {d.title}
              </div>
            ))}
          {type == "multipleChoice" &&
            data.map((d, idx) => (
              <div
                key={idx}
                className={`bg-gray-900 py-1 px-2 mb-1 w-full flex items-center rounded-md cursor-pointer ${
                  state.includes(d)
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }  `}
                onClick={() => {
                  state.includes(d)
                    ? setState((prev: string[]) => prev.filter((p) => p !== d))
                    : setState((prev: string[]) => [...prev, d]);
                }}
              >
                {d}
              </div>
            ))}
          {type == "tag" &&
            data.map((d: Tag, idx) => (
              <div
                key={idx}
                className={`bg-gray-900 py-1 px-2 mb-1 w-full flex items-center rounded-md cursor-pointer ${
                  state.includes(d)
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }  `}
                onClick={() => {
                  state.includes(d)
                    ? setState((prev: Tag[]) => prev.filter((p) => p !== d))
                    : setState((prev: Tag[]) => [...prev, d]);
                }}
              >
                {d.attributes.name.en}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
