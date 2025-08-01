"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { QuickResponseCard } from "./QuickResponseCard";
import { ContactConfirmationDialog } from "./ContactConfirmationDialog";

export function ContactSection({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch for a free quote or to discuss your project
            requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send an Enquiry</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm
                onSuccess={(id) => {
                  setRequestId(id);
                  setConfirmationOpen(true);
                }}
              />
            </CardContent>
          </Card>
          {/* Contact Information and Quick Response */}
          <div className="space-y-6">
            <ContactInfo profile={profile} profileLoading={loading} />
            <QuickResponseCard />
          </div>
        </div>
      </div>
      <ContactConfirmationDialog
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        requestId={requestId}
      />
    </section>
  );
}
