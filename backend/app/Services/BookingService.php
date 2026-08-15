<?php

namespace App\Services;

use App\Models\Booking;

class BookingService
{

    private array $activeStatuses = [
        'DRAFT',
        'PENDING_LEVEL_1',
        'PENDING_LEVEL_2',
        'APPROVED',
        'IN_USE',
    ];


    public function checkVehicleAvailability(
        $vehicleId,
        $bookingDate,
        $startTime,
        $endTime
    ): bool
    {
        return !Booking::where('vehicle_id', $vehicleId)
            ->whereDate('booking_date', $bookingDate)
            ->whereIn('status', $this->activeStatuses)
            ->where(function ($query) use ($startTime, $endTime) {

                $query
                    ->where('start_time', '<', $endTime)
                    ->where('end_time', '>', $startTime);

            })
            ->exists();
    }



    public function checkDriverAvailability(
        $driverId,
        $bookingDate,
        $startTime,
        $endTime
    ): bool
    {
        return !Booking::where('driver_id', $driverId)
            ->whereDate('booking_date', $bookingDate)
            ->whereIn('status', $this->activeStatuses)
            ->where(function ($query) use ($startTime, $endTime) {

                $query
                    ->where('start_time', '<', $endTime)
                    ->where('end_time', '>', $startTime);

            })
            ->exists();
    }

}