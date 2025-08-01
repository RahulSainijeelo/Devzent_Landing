"use client";

import { useState } from "react";
import { useEnquiries } from "./useEnquiries";
import { EnquiryTable } from "./EnquiryTable";
import { EnquiryDetailsDialog } from "./EnquiryDetailsDialog";

export function ContactEnquiries() {
  const { enquiries, loading, updateStatus } = useEnquiries();
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleCall = (mobile: string) => {
    window.location.href = `tel:${mobile}`;
  };

  const handleSMS = (mobile: string) => {
    window.location.href = `sms:${mobile}`;
  };

  const handleWhatsApp = (mobile: string, name: string) => {
    const message = `Hello ${name}, this is Kailash Chand Yogi regarding your enquiry about our services.`;
    window.open(
      `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Enquiries</h2>
      </div>
      <EnquiryTable
        enquiries={enquiries}
        loading={loading}
        onView={(enquiry) => {
          setSelectedEnquiry(enquiry);
          setIsViewOpen(true);
        }}
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onSMS={handleSMS}
        onStatusChange={updateStatus}
      />
      <EnquiryDetailsDialog
        enquiry={selectedEnquiry}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onSMS={handleSMS}
      />
    </div>
  );
}
