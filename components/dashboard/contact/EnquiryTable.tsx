import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function EnquiryTable({
  enquiries,
  loading,
  onView,
  onCall,
  onWhatsApp,
  onSMS,
  onStatusChange,
}: {
  enquiries: any[];
  loading: boolean;
  onView: (enquiry: any) => void;
  onCall: (mobile: string) => void;
  onWhatsApp: (mobile: string, name: string) => void;
  onSMS: (mobile: string) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500 hover:bg-blue-600";
      case "contacted":
        return "bg-amber-500 hover:bg-amber-600";
      case "completed":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>View</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            : enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(enquiry)}
                      aria-label="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.serviceType}</TableCell>
                  <TableCell>{formatDate(enquiry.time)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(enquiry.status)}>
                      {enquiry.status.charAt(0).toUpperCase() +
                        enquiry.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onView(enquiry)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onCall(enquiry.mobile)}
                        >
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onWhatsApp(enquiry.mobile, enquiry.name)
                          }
                        >
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSMS(enquiry.mobile)}>
                          Send SMS
                        </DropdownMenuItem>
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onStatusChange(enquiry.id, "new")}
                        >
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(enquiry.id, "contacted")
                          }
                        >
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(enquiry.id, "completed")
                          }
                        >
                          Mark as Completed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
