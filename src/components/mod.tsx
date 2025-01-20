"use client";

import { Drawer } from "vaul";
import React from "react";

export default function VaulDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer.Root dismissible={false} open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:text-white dark:hover:bg-[#1A1A19]">
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium text-gray-900">
                A non-dismissible drawer.
              </Drawer.Title>
              <p className="mb-2 text-gray-600">
                For cases when your drawer has to be always visible.
              </p>
              <p className="mb-2 text-gray-600">
                Nothing will close it unless you make it controlled and close it
                programmatically.
              </p>
              <button
                className="mt-4 w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Close Drawer
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
