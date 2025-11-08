'use client'
import React, { useContext, createContext, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { z } from "zod";
import { newWaitlistEntry, getWaitlistCount } from "@/server/waitlist";
import { Checkbox } from "@/components/ui/checkbox";

const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

type WaitlistContextType = {
  count: number;
  updateCount: () => Promise<void>;
};

const WaitlistContext = createContext<WaitlistContextType>({
  count: 0,
  updateCount: async () => {},
});

const WaitlistForm: React.FC<{title: string, subtitle: string, id?: string}> = ({title, subtitle, id}) => {
  const { count, updateCount } = useContext(WaitlistContext);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [joined, setJoined] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  const [agreement, setAgreement] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parseEmail = EmailSchema.safeParse({ email });
    if (!agreement) {
      setError("You must agree to receive updates from us.");
      return;
    }
    setError(parseEmail.success ? null : "Please enter a valid email.");
    if (!parseEmail.success) return;
    const request = await newWaitlistEntry(email)
    if (request === "Email already exists") {
      setError("Email already exists");
    }
    if (request === "Success") {
      setJoined(true);
    }
    await updateCount();
    setEmail('');
    setAgreement(false);
  };

  return (
    <div className="container bg-card rounded-xl flex items-center px-10 py-8 gap-10" id={id} data-aos="fade-up" data-aos-duration="1000">
        {/* Left: Text/Form */}
        <div
          className={`flex-1 flex flex-col justify-between z-10 dark:text-white text-black p-6 w-full md:transition-all md:duration-300`}
          style={{ minHeight: '350px' }}
        >
          {/* Top: Title/Subtitle */}
          <div className="flex flex-col">
            {joined && <p className="dark:text-white text-3xl w-full">Thank you for joining the waitlist!</p>}
            {!joined && (
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-semibold">{title}</h1>
                <h2 className="text-lg sm:text-xl md:text-2xl mb-2">{subtitle}</h2>
              </div>
            )}
          </div>
          {/* Bottom: Count + Form */}
          <div className="flex flex-col w-full items-start">
            <h3 className="text-base sm:text-lg md:text-xl mb-4">Join {count ? count + 100 : 0} people on the waitlist</h3>
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                name="agreement"
                id="agreement"
                checked={agreement}
                onCheckedChange={checked => setAgreement(!!checked)}
                aria-required
              />
              <Label htmlFor="agreement" className="text-sm select-none cursor-pointer">
                You agree to receive updates from us
              </Label>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <Input
                onFocus={() => setClicked(true)}
                onBlur={() => setClicked(false)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full max-w-md"
                disabled={joined}
              />
              {error && <p className="text-error text-xs w-full">{error}</p>}
              <Button type="submit" className="w-full max-w-md" disabled={joined}>
                Enter Waitlist
              </Button>
            </form>
          </div>
        </div>
        {/* Right: Image Background */}
        <img
          src="/api/media/file/card-logo.png"
          alt=""
          className={`hidden md:block border-border object-cover w-1/3 transition-all duration-300`}
          loading="lazy"
          fetchPriority="high"
          decoding="async"
        />
    </div>
  );
};

const WaitlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  
  const updateCount = useCallback(async () => {
    const newCount = await getWaitlistCount();
    setCount(newCount);
  }, []);

  React.useEffect(() => {
    updateCount();
  }, []);

  return (
    <WaitlistContext.Provider value={{ count, updateCount }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const WaitlistBlock: React.FC<{title: string, subtitle: string, id?: string}> = ({title, subtitle, id}) => {
  return (
    <WaitlistProvider>
      <WaitlistForm title={title} subtitle={subtitle} id={id}/>
    </WaitlistProvider>
  );
};