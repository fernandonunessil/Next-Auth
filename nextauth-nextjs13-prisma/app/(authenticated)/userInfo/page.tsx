import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-screen bg-blue-800 grid justify-center items-center text-white">
      <h2 className="font-semibold text-3xl">
        This is a Admin page, use to responsabilit
      </h2>
      <Link href={"/"}>
        <div className="w-full text-center bg-orange-400 p-2 rounded">
          <div className="font-semibold">Voltar para a pagina root</div>
        </div>
      </Link>
    </div>
  );
}
