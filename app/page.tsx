"use client"

import { Live } from "@/components/Live";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { LeftSidebar } from "@/components/LeftSidebar";

import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";

import { fabric } from "fabric"
import { ActiveElement } from "@/types/type";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>("rectangle");

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  })

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);

    selectedShapeRef.current = element?.value as string;
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })

    // MAIN FUNCTION TO DRAW SHAPES
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      })
    })

    // LISTENER TO RESIZE CANVAS
    window.addEventListener("resize", () => {
      handleResize({ fabricRef })
    })
  }, [])

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>
    </main>
  );
}