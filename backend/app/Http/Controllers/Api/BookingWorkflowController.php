<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\ApprovalService;

class BookingWorkflowController extends Controller
{

    public function submit(
        Booking $booking,
        ApprovalService $approvalService
    )
    {

        if ($booking->status !== 'DRAFT') {
            return response()->json([
                'message' => 'Booking tidak dapat disubmit.'
            ], 422);
        }


        $booking = $approvalService->submit($booking);


        return response()->json([
            'message' => 'Booking berhasil disubmit.',
            'data' => $booking
        ]);

    }

}