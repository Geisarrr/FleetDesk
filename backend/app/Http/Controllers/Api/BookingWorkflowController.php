<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\ApprovalService;
use App\Services\ActivityLogService;

class BookingWorkflowController extends Controller
{

    public function submit(
        Booking $booking,
        ApprovalService $approvalService,
        ActivityLogService $activityLogService
    )
    {

        if ($booking->status !== 'DRAFT') {

            return response()->json([
                'message' => 'Booking tidak dapat disubmit.'
            ], 422);

        }


        $booking = $approvalService->submit($booking);


        $activityLogService->log(
            'SUBMIT',
            'Booking',
            $booking->id,
            "Submit booking {$booking->booking_code}",
            [
                'status'=>$booking->status
            ]
        );


        return response()->json([
            'message'=>'Booking berhasil disubmit.',
            'data'=>$booking->load('approvals')
        ]);

    }

}