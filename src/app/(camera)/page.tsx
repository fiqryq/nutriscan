"use client";
import { Header } from "@/components/ui/header";
import { Main } from "@/components/ui/page-wrapper";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useEffect } from "react";

export default function Home() {
  const handleOnScan = (result: IDetectedBarcode) => {
    console.log(result);
  };
  return (
    <Main>
      <Scanner
        classNames={{}}
        scanDelay={100}
        styles={{
          container: {
            height: "100%",
          },
        }}
        allowMultiple={true}
        components={{
          audio: true,
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
        }}
        formats={[
          "qr_code",
          "micro_qr_code",
          "rm_qr_code",
          "maxi_code",
          "pdf417",
          "aztec",
          "data_matrix",
          "matrix_codes",
          "dx_film_edge",
          "databar",
          "databar_expanded",
          "codabar",
          "code_39",
          "code_93",
          "code_128",
          "ean_8",
          "ean_13",
          "itf",
          "linear_codes",
          "upc_a",
          "upc_e",
        ]}
        onError={(result) => console.log(result)}
        onScan={(result) => console.log(result)}
      />
    </Main>
  );
}
