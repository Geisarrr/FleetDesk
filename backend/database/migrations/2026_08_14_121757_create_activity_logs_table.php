<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('action', 100);

            $table->string('entity_type', 100)
                ->nullable();

            $table->unsignedBigInteger('entity_id')
                ->nullable();

            $table->text('description')
                ->nullable();

            $table->json('metadata')
                ->nullable();

            $table->timestamp('created_at')
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('activity_logs');
    }
};