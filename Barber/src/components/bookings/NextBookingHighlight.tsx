interface Booking {
  id: string
  clientName: string
  clientPhone: string
  professionalId: string
  professionalName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  price: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface NextBookingHighlightProps {
  booking: Booking
}

export default function NextBookingHighlight({ booking }: NextBookingHighlightProps) {
  const dateObj = new Date(booking.date + 'T' + booking.time)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="card border-gold/50 bg-gradient-to-br from-gold/10 to-transparent shadow-lg shadow-gold/5">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <h3 className="text-gold font-semibold text-sm uppercase tracking-wide">Próximo agendamento</h3>
        </div>
        
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-display text-text font-bold">{booking.time}</span>
              <span className="text-3xl md:text-4xl font-display text-text font-bold">{booking.clientName}</span>
            </div>
            <span className="text-text-dim text-sm capitalize">{formattedDate}</span>
          </div>
          
          <div className="grid gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dim">Profissional:</span>
              <span className="text-text font-medium">{booking.professionalName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dim">Serviço:</span>
              <span className="text-text font-medium">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dim">Valor:</span>
              <span className="text-gold font-semibold">R$ {booking.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
