import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <div className="w-full text py-6 pl-4 flex justify-center align-middle" style={{backgroundColor: "rgba(0, 0, 0, 0.9)", color: "white"}}>
      This is a third-party website powered by the
      <span>
        <a href="https://api.mangadex.org/docs/" target="_blank">
          {" "}
          MangaDex API
        </a>
        <Icon icon="material-symbols:open-in-new" className="inline" />
      </span>
    </div>
  );
}
