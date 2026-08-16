<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Booking;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

public function index()
{

return response()->json([


'vehicles'=>[

'total'=>Vehicle::count(),

'available'=>Vehicle::where(
'status',
'ACTIVE'
)->count(),

'maintenance'=>Vehicle::where(
'status',
'MAINTENANCE'
)->count(),

],



'approval'=>[

'pending'=>Booking::whereIn(
'status',
[
'PENDING_LEVEL_1',
'PENDING_LEVEL_2'
]
)->count(),


'approved'=>Booking::where(
'status',
'APPROVED'
)->count(),


'rejected'=>Booking::where(
'status',
'REJECTED'
)->count(),

],



'recentBookings'=>Booking::with([
'vehicle',
'requester'
])
->latest()
->take(5)
->get()


]);

}

}