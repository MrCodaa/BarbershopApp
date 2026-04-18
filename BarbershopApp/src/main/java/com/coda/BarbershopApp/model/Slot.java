package com.coda.BarbershopApp.model;


import lombok.*;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Slot {
    private LocalTime pocetak;
    private LocalTime kraj;
}
