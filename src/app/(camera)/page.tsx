"use client";
import { Main } from "@/components/ui/page-wrapper";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleOnScan = async (result: IDetectedBarcode[]) => {
    const { rawValue: barcode } = result[0];
    router.push(`/detail?barcode=${barcode}`);
  };

  return (
    <Main className="flex flex-col items-center relative justify-center bg-black">
      <div className=" h-[400px] z-40 bg-gradient-to-b from-black via-black to-transparent fr w-full absolute top-0"></div>
      <div className=" h-[400px] z-40 bg-gradient-to-t from-black via-black to-transparent fr w-full absolute bottom-0"></div>
      <h1 className="text-white z-50 font-bold text-3xl absolute top-28 font-mono">
        Nutriscan
      </h1>
      <Scanner
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
        onScan={(result) => handleOnScan(result)}
      />
    </Main>
  );
}
