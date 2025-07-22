import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomCard } from "@/components/RoomCard";
import { BookingForm } from "@/components/BookingForm";
import { ReservationsList } from "@/components/ReservationsList";
import { Search, Building2, Calendar, Clock } from "lucide-react";

// Mock data
const mockRooms = [
  {
    id: "1",
    name: "Sala Executiva",
    capacity: 12,
    location: "1º Andar - Ala Norte",
    amenities: ["Projetor", "Videoconferência", "Quadro branco", "Wi-Fi"],
    isAvailable: true,
  },
  {
    id: "2",
    name: "Sala de Brainstorm",
    capacity: 8,
    location: "2º Andar - Ala Sul",
    amenities: ["Quadro branco", "Post-its", "Wi-Fi", "Café"],
    isAvailable: false,
    nextAvailable: "14:00"
  },
  {
    id: "3",
    name: "Auditório Principal",
    capacity: 50,
    location: "Térreo - Centro",
    amenities: ["Projetor", "Sistema de som", "Microfones", "Ar condicionado"],
    isAvailable: true,
  },
  {
    id: "4",
    name: "Sala de Reunião Quick",
    capacity: 4,
    location: "1º Andar - Ala Sul",
    amenities: ["TV", "Wi-Fi", "Quadro branco"],
    isAvailable: true,
  },
  {
    id: "5",
    name: "Sala de Treinamento",
    capacity: 20,
    location: "2º Andar - Ala Norte",
    amenities: ["Projetor", "Computadores", "Wi-Fi", "Ar condicionado"],
    isAvailable: false,
    nextAvailable: "16:30"
  }
];

const mockReservations = [
  {
    id: "1",
    roomName: "Sala Executiva",
    roomLocation: "1º Andar - Ala Norte",
    organizer: "João Silva",
    date: new Date(2024, 11, 25),
    startTime: "10:00",
    endTime: "11:30",
    purpose: "Reunião de planejamento estratégico para Q1 2025",
    attendees: 8,
    status: "confirmed" as const,
  },
  {
    id: "2",
    roomName: "Auditório Principal",
    roomLocation: "Térreo - Centro",
    organizer: "Maria Santos",
    date: new Date(2024, 11, 28),
    startTime: "14:00",
    endTime: "16:00",
    purpose: "Apresentação de resultados anuais",
    attendees: 35,
    status: "confirmed" as const,
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string } | null>(null);

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = capacityFilter === "" || 
                           (capacityFilter === "small" && room.capacity <= 6) ||
                           (capacityFilter === "medium" && room.capacity > 6 && room.capacity <= 15) ||
                           (capacityFilter === "large" && room.capacity > 15);
    
    const matchesAvailability = availabilityFilter === "" ||
                               (availabilityFilter === "available" && room.isAvailable) ||
                               (availabilityFilter === "unavailable" && !room.isAvailable);
    
    return matchesSearch && matchesCapacity && matchesAvailability;
  });

  const handleBookRoom = (roomId: string) => {
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom({ id: roomId, name: room.name });
      setIsBookingFormOpen(true);
    }
  };

  const handleCancelReservation = (reservationId: string) => {
    // In a real app, this would make an API call
    console.log("Cancelling reservation:", reservationId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-muted/50 bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sistema de Reservas</h1>
              <p className="text-muted-foreground">Gerencie reservas de salas de reunião</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Salas Disponíveis
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Minhas Reservas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar salas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Capacidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="small">Até 6 pessoas</SelectItem>
                  <SelectItem value="medium">7-15 pessoas</SelectItem>
                  <SelectItem value="large">16+ pessoas</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="unavailable">Ocupadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-muted/50">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Total de Salas</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">{mockRooms.length}</p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-muted/50">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Disponíveis</span>
                </div>
                <p className="text-2xl font-bold text-success mt-1">
                  {mockRooms.filter(r => r.isAvailable).length}
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-muted/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-warning" />
                  <span className="text-sm font-medium">Ocupadas</span>
                </div>
                <p className="text-2xl font-bold text-warning mt-1">
                  {mockRooms.filter(r => !r.isAvailable).length}
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-muted/50">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Filtradas</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">{filteredRooms.length}</p>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
              ))}
            </div>
            
            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma sala encontrada com os filtros aplicados.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reservations">
            <ReservationsList 
              reservations={mockReservations} 
              onCancel={handleCancelReservation}
            />
          </TabsContent>
        </Tabs>
      </div>

      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => {
          setIsBookingFormOpen(false);
          setSelectedRoom(null);
        }}
        roomId={selectedRoom?.id}
        roomName={selectedRoom?.name}
      />
    </div>
  );
};

export default Index;
