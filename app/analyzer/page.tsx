"use client";
import { useState } from "react";
import { AddressForm } from "./address-form";
import { MetadataTable } from "./metadata-table";

export default function Analyzer() {
  const [metaData, setMetaData] = useState<MetaData | null>(null);

  return (
    <main className="flex min-h-screen flex-col px-4 py-8 max-w-3xl mx-auto">
      <div className="flex gap-1 items-baseline mt-20">
        <div className="inline-flex bg-orange-500 w-4 h-4"></div>
        <div className="inline-flex bg-orange-400 w-4 h-4"></div>
        <div className="inline-flex bg-orange-300 w-4 h-4"></div>
      </div>
      <h1 className="text-4xl font-semibold mb-6 mr-2 ">Bitmap analyzer</h1>
      <AddressForm setMetaData={setMetaData} />
      {metaData ? (
        metaData?.length > 0 ? (
          <MetadataTable metaData={metaData} />
        ) : (
          "No results so far"
        )
      ) : (
        ""
      )}
    </main>
  );
}
