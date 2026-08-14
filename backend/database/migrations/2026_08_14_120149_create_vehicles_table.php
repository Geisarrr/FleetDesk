<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('vehicle_type_id')
                ->constrained('vehicle_types')
                ->restrictOnDelete();

            $table->foreignId('site_id')
                ->constrained('sites')
                ->restrictOnDelete();

            $table->string('license_plate', 20)->unique();
            $table->string('brand', 50);
            $table->string('model', 50);
            $table->smallInteger('year')->nullable();

            $table->enum('ownership', [
                'COMPANY',
                'RENTAL',
            ]);

            $table->enum('status', [
                'ACTIVE',
                'INACTIVE',
                'MAINTENANCE',
            ]);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};