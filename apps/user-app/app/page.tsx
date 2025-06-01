import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};


export default function Home() {  
  return (
  <h1 className="text-3xl font-bold underline">
      Hello world!    
  </h1>  
  )
}
