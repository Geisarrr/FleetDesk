#!/bin/bash

BASE_URL="http://127.0.0.1:8000/api"

ADMIN_TOKEN="10|M8KuY6CqMYonqFFnXK9Z5vfx5G4xUuDm6qusfa4s935f9bff"

APPROVER_TOKEN="11|ciAVRhuYnH4gtO8TNUrsa6MJRxNfamsA4qWO8XLE3ec997ba"


# Generate tanggal random agar tidak bentrok
BOOKING_DATE=$(date -v+$(($RANDOM % 20 + 1))d +%Y-%m-%d)


echo ""
echo "================================="
echo " CREATE BOOKING"
echo "================================="

echo "Booking Date : $BOOKING_DATE"



RESPONSE=$(curl -s -X POST "$BASE_URL/bookings" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-d "{
    \"region_id\":1,
    \"site_id\":1,
    \"vehicle_id\":1,
    \"driver_id\":1,
    \"booking_date\":\"$BOOKING_DATE\",
    \"start_time\":\"08:00\",
    \"end_time\":\"17:00\",
    \"destination\":\"Jakarta\",
    \"purpose\":\"Automation workflow test\",
    \"notes\":\"Full workflow testing\"
}")


echo "$RESPONSE"


BOOKING_ID=$(echo "$RESPONSE" | jq -r '.data.id')


echo ""
echo "BOOKING ID = $BOOKING_ID"



if [ "$BOOKING_ID" == "null" ] || [ -z "$BOOKING_ID" ]; then

    echo ""
    echo "CREATE BOOKING GAGAL"
    exit 1

fi



echo ""
echo "================================="
echo " SUBMIT BOOKING"
echo "================================="


curl -s -X POST \
"$BASE_URL/bookings/$BOOKING_ID/submit" \
-H "Accept: application/json" \
-H "Authorization: Bearer $ADMIN_TOKEN"


echo ""



echo ""
echo "================================="
echo " GET APPROVAL LEVEL 1"
echo "================================="


APPROVAL_ID=$(php artisan tinker --execute="
echo App\Models\BookingApproval::where('booking_id',$BOOKING_ID)
->where('level',1)
->value('id');
" | tail -1)


echo "LEVEL 1 APPROVAL ID = $APPROVAL_ID"



if [ -z "$APPROVAL_ID" ]; then

    echo "Approval Level 1 tidak ditemukan"
    exit 1

fi



echo ""
echo "================================="
echo " APPROVE LEVEL 1"
echo "================================="


curl -s -X POST \
"$BASE_URL/booking-approvals/$APPROVAL_ID/approve" \
-H "Accept: application/json" \
-H "Authorization: Bearer $APPROVER_TOKEN"


echo ""



echo ""
echo "================================="
echo " GET APPROVAL LEVEL 2"
echo "================================="


APPROVAL_LEVEL2=$(php artisan tinker --execute="
echo App\Models\BookingApproval::where('booking_id',$BOOKING_ID)
->where('level',2)
->value('id');
" | tail -1)


echo "LEVEL 2 APPROVAL ID = $APPROVAL_LEVEL2"



if [ -z "$APPROVAL_LEVEL2" ]; then

    echo "Approval Level 2 tidak ditemukan"
    exit 1

fi



echo ""
echo "================================="
echo " APPROVE LEVEL 2"
echo "================================="


curl -s -X POST \
"$BASE_URL/booking-approvals/$APPROVAL_LEVEL2/approve" \
-H "Accept: application/json" \
-H "Authorization: Bearer $APPROVER_TOKEN"


echo ""



echo ""
echo "================================="
echo " FINAL BOOKING STATUS"
echo "================================="


php artisan tinker --execute="
print_r(
App\Models\Booking::find($BOOKING_ID)->toArray()
);
"



echo ""
echo "================================="
echo " ACTIVITY LOG"
echo "================================="


php artisan tinker --execute="
print_r(
App\Models\ActivityLog::where('entity_id',$BOOKING_ID)
->get()
->toArray()
);
"


echo ""
echo "================================="
echo " TEST SELESAI"
echo "================================="