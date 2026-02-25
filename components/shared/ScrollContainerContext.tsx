"use client";

import { createContext, useContext, type RefObject } from "react";

const ScrollContainerContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

export default ScrollContainerContext;
