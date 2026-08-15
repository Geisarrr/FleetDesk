<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingApproval;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\ActivityLogService;


class BookingApprovalController extends Controller
{

    public function approve(
        BookingApproval $approval,
        ActivityLogService $activityLogService
    )
    {

        if ($approval->decision !== 'Pending') {

            return response()->json([
                'message'=>'Approval sudah diproses.'
            ],422);

        }


        $bookingId = $approval->booking_id;

        $logData = null;


        DB::transaction(function () use (
            $approval,
            $bookingId,
            &$logData
        ) {


            $approval = BookingApproval::lockForUpdate()
                ->findOrFail($approval->id);



            $approval->update([

                'decision'=>'Approved',

                'decided_at'=>Carbon::now()

            ]);



            $booking = $approval->booking;



            /*
             |--------------------------------------------------------------------------
             | LEVEL 1 APPROVAL
             |--------------------------------------------------------------------------
             */

            if ($approval->level == 1) {


                $booking->update([

                    'status'=>'PENDING_LEVEL_2'

                ]);



                BookingApproval::create([

                    'booking_id'=>$booking->id,

                    'approver_id'=>auth()->id(),

                    'level'=>2,

                    'decision'=>'Pending'

                ]);



                $logData = [

                    'action'=>'APPROVE_LEVEL_1',

                    'description'=>"Menyetujui level 1 booking {$booking->booking_code}",

                    'metadata'=>[
                        'status'=>$booking->status
                    ]

                ];

            }



            /*
             |--------------------------------------------------------------------------
             | LEVEL 2 APPROVAL
             |--------------------------------------------------------------------------
             */

            if ($approval->level == 2) {


                $booking->update([

                    'status'=>'APPROVED'

                ]);



                $logData = [

                    'action'=>'APPROVE_LEVEL_2',

                    'description'=>"Menyetujui level 2 booking {$booking->booking_code}",

                    'metadata'=>[
                        'status'=>$booking->status
                    ]

                ];

            }


        });



        /*
         |--------------------------------------------------------------------------
         | ACTIVITY LOG AFTER COMMIT
         |--------------------------------------------------------------------------
         */


        if ($logData) {

            $activityLogService->log(

                $logData['action'],

                'Booking',

                $bookingId,

                $logData['description'],

                $logData['metadata']

            );

        }



        $booking = \App\Models\Booking::with([
            'approvals'
        ])
        ->findOrFail($bookingId);



        return response()->json([

            'message'=>'Booking berhasil disetujui.',

            'data'=>$booking

        ]);

    }

}