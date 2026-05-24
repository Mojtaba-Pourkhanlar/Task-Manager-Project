"use client";

import { ChevronRight } from "lucide-react";
import React, { ReactNode } from "react";
import { accordionStyles as s } from "./core.styles";

interface AccordionItemProps {
  eventKey: string;
  header: ReactNode;
  children: ReactNode;
}

interface CustomAccordionProps {
  activeKeys: string[];
  onChange: (key: string) => void;
  items: AccordionItemProps[];
}
const Accordion: React.FC<CustomAccordionProps> = ({
  activeKeys,
  onChange,
  items,
}) => {
  return (
    <div className={s.container}>
      {items.map(item => {
        const isOpen = activeKeys.includes(item.eventKey);

        return (
          <div key={item.eventKey} className={s.itemWrapper}>
            <div
              className={s.headerRow}
              onClick={() => onChange(item.eventKey)}
            >
              <div className={s.dashedLine} />
              <button type="button" className={s.button}>
                {item.header}
              </button>
              <div
                className={`${s.icon} ${isOpen ? "-rotate-90" : "rotate-90"}`}
              >
                <ChevronRight />
              </div>
            </div>

            <div className={s.contentWrapper(isOpen)}>
              <div className={s.contentInner}>{item.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
