<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Services\BookingService;
use App\Services\BookingCodeService;
use App\Services\ActivityLogService;

class BookingController extends Controller
{

    public function index()
    {
        $bookings = Booking::with([
            'requester',
            'region',
            'site',
            'vehicle',
            'driver',
            'approvals'
        ])->get();


        return response()->json([
            'data' => $bookings
        ]);
    }



    public function store(
    StoreBookingRequest $request,
    BookingService $bookingService,
    BookingCodeService $bookingCodeService,
    ActivityLogService $activityLogService
    )
    {
        if (!$bookingService->checkVehicleAvailability(
            $request->vehicle_id,
            $request->booking_date,
            $request->start_time,
            $request->end_time
        )) {
            return response()->json([
                'message' => 'Vehicle tidak tersedia pada waktu tersebut.'
            ], 422);
        }


        if (!$bookingService->checkDriverAvailability(
            $request->driver_id,
            $request->booking_date,
            $request->start_time,
            $request->end_time
        )) {
            return response()->json([
                'message' => 'Driver tidak tersedia pada waktu tersebut.'
            ], 422);
        }
        $booking = Booking::create([

            'booking_code' => $bookingCodeService->generate(),

            'requester_id' => Auth::id(),

            'region_id' => $request->region_id,

            'site_id' => $request->site_id,

            'vehicle_id' => $request->vehicle_id,

            'driver_id' => $request->driver_id,

            'booking_date' => $request->booking_date,

            'start_time' => $request->start_time,

            'end_time' => $request->end_time,

            'destination' => $request->destination,

            'purpose' => $request->purpose,

            'notes' => $request->notes,

            'status' => 'DRAFT',

        ]);
        $activityLogService->log(

            'CREATE',

            'Booking',

            $booking->id,

            "Membuat booking {$booking->booking_code}",

            [
                'status' => $booking->status
            ]

        );


        return response()->json([
            'message' => 'Booking berhasil dibuat.',
            'data' => $booking->load([
                'requester',
                'region',
                'site',
                'vehicle',
                'driver',
                'approvals'
            ])
        ], 201);
    }




    public function show(string $id)
    {
        $booking = Booking::with([
            'requester',
            'region',
            'site',
            'vehicle',
            'driver',
            'approvals'
        ])->findOrFail($id);


        return response()->json([
            'data' => $booking
        ]);
    }




    public function update(
    UpdateBookingRequest $request,
    string $id,
    ActivityLogService $activityLogService
    )
    {
        $booking = Booking::findOrFail($id);


        /*
         * Untuk sementara hanya update data booking.
         * Status workflow nanti dibuat terpisah:
         * submit approval
         * approve
         * reject
         */

        $booking->update([

            'region_id' => $request->region_id ?? $booking->region_id,

            'site_id' => $request->site_id ?? $booking->site_id,

            'vehicle_id' => $request->vehicle_id ?? $booking->vehicle_id,

            'driver_id' => $request->driver_id ?? $booking->driver_id,

            'booking_date' => $request->booking_date ?? $booking->booking_date,

            'start_time' => $request->start_time ?? $booking->start_time,

            'end_time' => $request->end_time ?? $booking->end_time,

            'destination' => $request->destination ?? $booking->destination,

            'purpose' => $request->purpose ?? $booking->purpose,

            'notes' => $request->notes ?? $booking->notes,

        ]);
        $activityLogService->log(

            'UPDATE',

            'Booking',

            $booking->id,

            "Mengubah booking {$booking->booking_code}",

            [
                'status'=>$booking->status
            ]

        );


        return response()->json([
            'message' => 'Booking berhasil diperbarui.',
            'data' => $booking->load([
                'requester',
                'region',
                'site',
                'vehicle',
                'driver',
                'approvals'
            ])
        ]);
    }





    public function destroy(
        string $id,
        ActivityLogService $activityLogService
    )
    {
        $booking = Booking::findOrFail($id);


        $booking->update([
            'status' => 'CANCELLED'
        ]);


        $activityLogService->log(

            'CANCEL',

            'Booking',

            $booking->id,

            "Membatalkan booking {$booking->booking_code}",

            [
                'status'=>$booking->status
            ]

        );


        return response()->json([
            'message' => 'Booking berhasil dibatalkan.',
            'data' => $booking
        ]);
    }

}