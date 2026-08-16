<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingApproval;
use Carbon\Carbon;


class ApprovalStatsController extends Controller
{


    public function index()
    {

        $pending = BookingApproval::where(
            'decision',
            'Pending'
        )->count();



        $approved = BookingApproval::where(
            'decision',
            'Approved'
        )->count();



        $rejected = BookingApproval::where(
            'decision',
            'Rejected'
        )->count();



        $avgTime = BookingApproval::where(
            'decision',
            'Approved'
        )
        ->whereNotNull('decided_at')
        ->get()
        ->avg(function($approval){

            return Carbon::parse(
                $approval->created_at
            )
            ->diffInMinutes(
                Carbon::parse(
                    $approval->decided_at
                )
            );

        });



        return response()->json([

            "pending"=>$pending,

            "approved"=>$approved,

            "rejected"=>$rejected,

            "avgTime"=>$avgTime
            ?
            round($avgTime / 60,1)."h"
            :
            "0h"

        ]);


    }

}