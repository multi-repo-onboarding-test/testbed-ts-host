// Bookings UI — scoped imports + common packages that should NOT produce matches
import type { BookingClient, Booking } from '@multi-repo-onboarding-test/testbed-getaways'
import { createBookingClient } from '@multi-repo-onboarding-test/testbed-getaways'
import type { LazloService } from '@multi-repo-onboarding-test/testbed-lazlo'
import { createLazloService } from '@multi-repo-onboarding-test/testbed-lazlo'
import React, { useState } from 'react'

export function BookingsView({ service }: { service: LazloService }) {
	const [bookings, setBookings] = useState<Booking[]>([])
	const client: BookingClient = createBookingClient(service)
	void client
	void setBookings
	return React.createElement('div', null, bookings.length)
}
