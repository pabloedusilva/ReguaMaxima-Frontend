import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// TODO: Backend Integration
// GET /api/bookings - List all bookings with filters
// DELETE /api/bookings/:id - Cancel booking

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

export default function BookingsList() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all')
  const [dateFilter, setDateFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filter, dateFilter, searchTerm, bookings])

  const loadBookings = () => {
    setIsLoading(true)
    try {
      const bookingsRaw = localStorage.getItem('userBookings')
      const allBookings: Booking[] = bookingsRaw ? JSON.parse(bookingsRaw) : []
      setBookings(allBookings)
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...bookings]

    // Status filter
    if (filter !== 'all') {
      filtered = filtered.filter(b => b.status === filter)
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(b => b.date === dateFilter)
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        b =>
          b.clientName.toLowerCase().includes(term) ||
          b.clientPhone.includes(term) ||
          b.serviceName.toLowerCase().includes(term)
      )
    }

    // Sort by date and time (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })

    setFilteredBookings(filtered)
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId)
  }

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return

    try {
      const updated = bookings.map(b =>
        b.id === bookingToCancel ? { ...b, status: 'cancelled' as const } : b
      )
      localStorage.setItem('userBookings', JSON.stringify(updated))
      setBookings(updated)
      setBookingToCancel(null)
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      scheduled: 'badge badge-scheduled',
      completed: 'badge badge-completed',
      cancelled: 'badge badge-cancelled'
    }
    const labels = {
      scheduled: 'Agendado',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    }
    return (
      <span className={badges[status as keyof typeof badges]}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-dim">Carregando agendamentos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">
          Agendamentos
        </h1>
        <p className="text-text-dim">
          Visualize e gerencie todos os agendamentos
        </p>
      </div>

      {/* Filters */}
      <div className="card animate-fade-in-delayed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nome, telefone ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">
              Data
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-text-dim mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-xl text-text focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">Todos</option>
              <option value="scheduled">Agendados</option>
              <option value="completed">Concluídos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-text-dim">
            <span className="font-semibold text-text">{filteredBookings.length}</span>{' '}
            agendamento(s) encontrado(s)
          </p>
          {(filter !== 'all' || dateFilter || searchTerm) && (
            <button
              onClick={() => {
                setFilter('all')
                setDateFilter('')
                setSearchTerm('')
              }}
              className="text-sm text-gold hover:text-gold-600 transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-text-dim">Nenhum agendamento encontrado</p>
        </div>
      ) : (
        <div className="table-container animate-fade-in-delayed">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Profissional</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div>
                      <p className="font-medium text-text">{booking.clientName}</p>
                      <p className="text-xs text-text-dim">{booking.clientPhone}</p>
                    </div>
                  </td>
                  <td className="text-text-dim">{booking.serviceName}</td>
                  <td className="text-text-dim">{booking.professionalName}</td>
                  <td className="text-text-dim">{formatDate(booking.date)}</td>
                  <td className="text-text-dim">{booking.time}</td>
                  <td className="font-semibold text-gold">{formatCurrency(booking.price)}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/agendamentos/${booking.id}`)}
                        className="p-2 rounded-lg hover:bg-surface text-text-dim hover:text-text transition-colors"
                        title="Ver detalhes"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {booking.status === 'scheduled' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                          title="Cancelar agendamento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {bookingToCancel && (
        <div className="modal-overlay" onClick={() => setBookingToCancel(null)}>
          <div className="modal-content p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-text mb-4">Cancelar Agendamento</h3>
            <p className="text-text-dim mb-6">
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBookingToCancel(null)}
                className="btn btn-outline flex-1"
              >
                Voltar
              </button>
              <button
                onClick={confirmCancelBooking}
                className="btn btn-danger flex-1"
              >
                Cancelar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
