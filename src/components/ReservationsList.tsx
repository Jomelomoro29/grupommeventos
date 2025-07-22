import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Reservation {
  id: string;
  roomName: string;
  roomLocation: string;
  organizer: string;
  date: Date;
  startTime: string;
  endTime: string;
  purpose?: string;
  attendees?: number;
  status: "confirmed" | "pending" | "cancelled";
}

interface ReservationsListProps {
  reservations: Reservation[];
  onCancel?: (reservationId: string) => void;
}

export function ReservationsList({ reservations, onCancel }: ReservationsListProps) {
  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Confirmada</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const isUpcoming = (date: Date) => {
    return date >= new Date();
  };

  if (reservations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Nenhuma reserva encontrada.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="transition-all duration-300 hover:shadow-md border-muted/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {reservation.roomName}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {reservation.roomLocation}
                </CardDescription>
              </div>
              {getStatusBadge(reservation.status)}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{format(reservation.date, "dd/MM/yyyy", { locale: ptBR })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{reservation.startTime} - {reservation.endTime}</span>
              </div>
              
              {reservation.attendees && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{reservation.attendees} participantes</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Organizador:</span> {reservation.organizer}
              </p>
              
              {reservation.purpose && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Propósito:</span> {reservation.purpose}
                </p>
              )}
            </div>
            
            {isUpcoming(reservation.date) && reservation.status === "confirmed" && onCancel && (
              <div className="flex justify-end pt-2 border-t border-muted/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(reservation.id)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Cancelar Reserva
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}