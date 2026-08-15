<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingApproval;
use Illuminate\Support\Facades\Auth;


class ApprovalController extends Controller
{


    public function index()
    {

        $user = Auth::user();


        $approvals = BookingApproval::with([

            'booking.requester',
            'booking.vehicle',
            'booking.driver',
            'booking.region',
            'booking.site'

        ])

        ->where('approver_id',$user->id)

        ->where('decision','Pending')

        ->latest()

        ->get();



        return response()->json([

            'data'=>$approvals

        ]);

    }



}