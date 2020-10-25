# Klasse NachtKorting
## Domeinregels
### Huren
- Periode van huren tussen (incl.) **1 april en 31 oktober**
- Huren kan voor **minimum 2 nachten en maximum 21 nachten**
- Begin en einde huren: **tussen 10:00 en 16:00** (incl.)
  - begint en eindigt steeds op het uur
- (Voorlopig) **2 vertrek- en aankomstplaatsen**: Nieuwpoort en Gent

### Vloot
- Bestaat uit meerdere boten: Janny, Marcel, Luxor, Jakarta, Manilla, Oslo, Reykjavik, ...
- Elke boot heeft een **type**

### Prijzen
- Elk type heeft een **Standaard Nachtprijs**
  - prijs steeds afgerond naar veelvoud van 10
  - april en oktober: +0%
  - mei en september: +20%
  - juni: +30%
  - juli en augustus: +40%
- Elk type heeft een **Nachtkorting**
  - NachtKorting "Geen" heeft geen items die een korting bepalen
  - nachtkorting heeft een **naam**
  - elke nachtkorting heeft een **lijst** met aantallen (nachten) en korting
  - nachtkorting kan gebruikt worden voor **meerdere types** boot
  - Aantallen kunnen maximaal **1 keer** voorkomen en moeten **groter zijn dan 0**
  - Kortingen moeten **groter zijn dan 0.0**
  - Over kortingen moet geïtereerd kunnen worden van **klein naar groot**