"use client";
import { cn } from "@/utils/common.util";

import { OTPInput as Input, SlotProps } from "input-otp";

export const OTPInput = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  return (
    <Input
      maxLength={6}
      onChange={(newValue: string) => onChange(newValue)}
      containerClassName="group flex items-center has-[:disabled]:opacity-30"
      render={({ slots }) => (
        <>
          <div className="flex flex-row gap-3">
            {slots.slice(0, 6).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
    />
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-[56px] w-[46px] text-2xl font-medium",
        "flex items-center justify-center",
        "transition-all duration-300",
        "rounded-xl border border-neutral-stroke-light",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline-accent-foreground/20 outline outline-0",
        props.isActive && "outline-accent-foreground border-brand-primary",
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
      <div className="h-8 w-px bg-black" />
    </div>
  );
}
