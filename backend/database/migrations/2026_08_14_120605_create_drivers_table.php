<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('site_id')
                ->constrained('sites')
                ->restrictOnDelete();

            $table->string('employee_id', 50)->unique();
            $table->string('name', 100);
            $table->string('phone', 30)->nullable();
            $table->string('license_number', 50)->unique();
            $table->date('license_expiry');

            $table->enum('status', [
                'ACTIVE',
                'INACTIVE',
            ]);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};