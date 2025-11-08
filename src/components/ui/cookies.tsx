'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accepted = localStorage.getItem("cookiesAccepted");
      setIsVisible(!accepted);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card
      className="fixed bg-card z-50 w-full max-w-full p-20 bottom-0 rounded-lg shadow-lg"
    >
      <CardBody className="gap-4">
        <div className="flex items-center gap-3">
          <Icon icon="lucide:cookie" className="text-2xl text-primary" />
          <h2 className="text-lg font-semibold">We use cookies</h2>
        </div>
        <p className="text-sm text-foreground-500">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking Accept All, you consent to our use of cookies.
        </p>
      </CardBody>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        <Link href="/cookies" size="sm" className="text-primary">
          Cookie Policy
        </Link>
        <div className="flex gap-2">
          <Button variant="flat" onPress={handleDecline}>
            Decline
          </Button>
          <Button color="primary" onPress={handleAccept}>
            Accept All
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};