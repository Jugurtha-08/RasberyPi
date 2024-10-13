package com.example.aninterface;

import android.annotation.SuppressLint;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private TextView labelz1, labelz2, labelz3, labelz4;
    private final OkHttpClient client = new OkHttpClient();
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    private boolean alarmStatus = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        labelz1 = findViewById(R.id.labelz1);
        labelz2 = findViewById(R.id.labelz2);
        labelz3 = findViewById(R.id.labelz3);
        labelz4 = findViewById(R.id.labelz4);
        Button bntonoff = findViewById(R.id.bntonoff);
        Button bntactiv = findViewById(R.id.bntactiv);
        Button bntdesac = findViewById(R.id.bntdesac);
        Button btnrest = findViewById(R.id.btnrest);

        labelz1.setOnClickListener(this::onZoneClick);
        labelz2.setOnClickListener(this::onZoneClick);
        labelz3.setOnClickListener(this::onZoneClick);
        labelz4.setOnClickListener(this::onZoneClick);


        bntactiv.setOnClickListener(v -> activate());

        bntdesac.setOnClickListener(v -> desactiver());

        btnrest.setOnClickListener(v -> resetZones());
    }

    @SuppressLint("NonConstantResourceId")
    public void onZoneClick(View view) {
        TextView label = (TextView) view;
        String zone = "";
        if (label.getId() == R.id.labelz1) {
            zone = "z1";
        } else if (label.getId() == R.id.labelz2) {
            zone = "z2";
        } else if (label.getId() == R.id.labelz3) {
            zone = "z3";
        } else if (label.getId() == R.id.labelz4) {
            zone = "z4";
        }
        sendRequest(zone, "on");
        updateLabelColor(label, true);
    }

    private void sendRequest(String zone, String status) {
        String url = "http://10.1.8.56:3000/api/updatezone";
        String json = "{\"zone\":\"" + zone + "\",\"status\":\"" + status + "\"}";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> {
                    Toast.makeText(MainActivity.this, "Request Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                    updateLabelColor(labelz1, false); // Update color based on failure (example, adjust as needed)
                });
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    if (response.isSuccessful()) {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Zone Updated Successfully", Toast.LENGTH_SHORT).show());
                    } else {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show());
                    }
                } finally {
                    // Always close the response body to prevent leaks
                    response.close();
                }
            }
        });
    }

    private void desactiver() {
        String url = "http://10.1.8.56:3000/api/desactivate";
        String json = "{\"statut\":\"" + "\"}";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Request Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    if (response.isSuccessful()) {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Alarm Status Updated Successfully", Toast.LENGTH_SHORT).show());
                    } else {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show());
                    }
                } finally {
                    response.close();
                }
            }
        });
    }

    private void resetZones() {
        String url = "http://10.1.8.56:3000/api/reset";

        Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create(null, new byte[0]))
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Request Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    if (response.isSuccessful()) {
                        runOnUiThread(() -> {
                            Toast.makeText(MainActivity.this, "Zones Reset Successfully", Toast.LENGTH_SHORT).show();
                            resetLabelColors();
                        });
                    } else {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show());
                    }
                } finally {
                    response.close();
                }
            }
        });
    }


    private void activate() {
        String url = "http://10.1.8.56:3000/api/activate";
        String json = "{\"statut\":\"activated\"}";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Request Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    if (response.isSuccessful()) {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Alarm Activated Successfully", Toast.LENGTH_SHORT).show());
                    } else {
                        runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Exception: " + e.getMessage(), Toast.LENGTH_SHORT).show());
                } finally {
                    if (response.body() != null) {
                        response.body().close();
                    }
                }
            }
        });
    }


    private void updateLabelColor(TextView label, boolean isActive) {
        if (label != null) {
            if (isActive) {
                label.setBackgroundColor(Color.parseColor("#FF3700B3")); // Active color
            } else {
                label.setBackgroundColor(Color.parseColor("#FF6200EE")); // Default color
            }
        }
    }

    private void resetLabelColors() {
        updateLabelColor(labelz1, false);
        updateLabelColor(labelz2, false);
        updateLabelColor(labelz3, false);
        updateLabelColor(labelz4, false);
    }
}
