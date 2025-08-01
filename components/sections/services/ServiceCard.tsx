import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Service } from "@/lib/data";

export function ServiceCard({
  service,
  onView,
}: {
  service: Service;
  onView: (service: Service) => void;
}) {
  return (
    <Card
      className={`
        overflow-hidden transition-all hover:shadow-lg
        min-w-[250px] max-w-xs w-full flex-shrink-0
      `}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {service.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full group"
          onClick={() => onView(service)}
        >
          <span className="mr-2">View Details</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
