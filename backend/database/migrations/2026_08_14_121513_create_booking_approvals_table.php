<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_approvals', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->restrictOnDelete();

            $table->foreignId('approver_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->unsignedTinyInteger('level');

            $table->enum('decision', [
                'Pending',
                'Approved',
                'Rejected',
            ]);

            $table->text('note')->nullable();

            $table->timestamp('decided_at')->nullable();

            $table->timestamps();

            $table->unique(['booking_id', 'level']);
        });
    }

    public function down(): void
    {
        Schema::table('booking_approvals', function (Blueprint $table) {
            $table->dropForeign(['booking_id']);
            $table->dropForeign(['approver_id']);
        });

        Schema::dropIfExists('booking_approvals');
    }
};