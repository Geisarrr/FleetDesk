<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('booking_code', 30)->unique();

            $table->foreignId('requester_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('region_id')
                ->constrained('regions')
                ->restrictOnDelete();

            $table->foreignId('site_id')
                ->constrained('sites')
                ->restrictOnDelete();

            $table->foreignId('vehicle_id')
                ->constrained('vehicles')
                ->restrictOnDelete();

            $table->foreignId('driver_id')
                ->constrained('drivers')
                ->restrictOnDelete();

            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');

            $table->string('destination', 255);
            $table->text('purpose');
            $table->text('notes')->nullable();

            $table->enum('status', [
                'DRAFT',
                'PENDING_LEVEL_1',
                'PENDING_LEVEL_2',
                'APPROVED',
                'IN_USE',
                'COMPLETED',
                'REJECTED',
                'CANCELLED',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['requester_id']);
            $table->dropForeign(['region_id']);
            $table->dropForeign(['site_id']);
            $table->dropForeign(['vehicle_id']);
            $table->dropForeign(['driver_id']);

            $table->dropUnique(['booking_code']);

            $table->dropColumn([
                'booking_code',
                'requester_id',
                'region_id',
                'site_id',
                'vehicle_id',
                'driver_id',
                'booking_date',
                'start_time',
                'end_time',
                'destination',
                'purpose',
                'notes',
                'status',
            ]);
        });
    }
};