import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Monitor, MapPin, Calendar } from "lucide-react";

interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  amenities: string[];
  isAvailable: boolean;
  nextAvailable?: string;
}

interface RoomCardProps {
  room: Room;
  onBook: (roomId: string) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-muted/50 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {room.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {room.location}
            </CardDescription>
          </div>
          <Badge 
            variant={room.isAvailable ? "default" : "secondary"} 
            className={room.isAvailable ? "bg-success text-success-foreground" : ""}
          >
            {room.isAvailable ? "Disponível" : "Ocupada"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} pessoas</span>
          </div>
          {room.amenities.includes("Projetor") && (
            <div className="flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              <span>Projetor</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {room.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{room.amenities.length - 3} mais
            </Badge>
          )}
        </div>
        
        {!room.isAvailable && room.nextAvailable && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Próximo horário: {room.nextAvailable}</span>
          </div>
        )}
        
        <Button 
          onClick={() => onBook(room.id)} 
          disabled={!room.isAvailable}
          className="w-full"
        >
          {room.isAvailable ? "Reservar Sala" : "Indisponível"}
        </Button>
      </CardContent>
    </Card>
  );
}