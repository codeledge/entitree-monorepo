var data = [
  { amount: "2", from: "Gerindra", to: "PDIP", color: "DB2016" },
  { amount: "20", from: "Hanura", to: "Perindo", color: "FFFFFF" },
  { amount: "3", from: "Hanura", to: "PPP", color: "00A100" },
  { amount: "12", from: "Dem", to: "NasDem", color: "27408B" },
  { amount: "12", from: "Dem", to: "NasDem", color: "FFA73D" },
  { amount: "7", from: "Dem", to: "Hanura", color: "FF7F00" },
  { amount: "2", from: "PBB", to: "NasDem", color: "27408B" },
  { amount: "2", from: "PBB", to: "NasDem", color: "FFA73D" },
  { amount: "12", from: "Golkar", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PKB", to: "PDIP", color: "DB2016" },
  { amount: "3", from: "Hanura", to: "PAN", color: "0000FF" },
  { amount: "3", from: "PDIP", to: "Golkar", color: "FFFF00" },
  { amount: "1", from: "PKPI", to: "PPP", color: "00A100" },
  { amount: "3", from: "NasDem", to: "Perindo", color: "FFFFFF" },
  { amount: "2", from: "PBB", to: "Hanura", color: "FF7F00" },
  { amount: "4", from: "PKPI", to: "Berkarya", color: "FF5F00" },
  { amount: "8", from: "Hanura", to: "Berkarya", color: "FF5F00" },
  { amount: "2", from: "Hanura", to: "Golkar", color: "FFFF00" },
  { amount: "2", from: "NasDem", to: "PKB", color: "00FF00" },
  { amount: "3", from: "Hanura", to: "Dem", color: "2643A3" },
  { amount: "3", from: "PBB", to: "Gerindra", color: "B79164" },
  { amount: "8", from: "PAN", to: "Perindo", color: "FFFFFF" },
  { amount: "1", from: "PAN", to: "PDIP", color: "DB2016" },
  { amount: "3", from: "PKB", to: "PPP", color: "00A100" },
  { amount: "6", from: "PAN", to: "NasDem", color: "27408B" },
  { amount: "6", from: "PAN", to: "NasDem", color: "FFA73D" },
  { amount: "11", from: "PKPI", to: "Perindo", color: "FFFFFF" },
  { amount: "3", from: "PAN", to: "Golkar", color: "FFFF00" },
  { amount: "3", from: "PKPI", to: "PKB", color: "00FF00" },
  { amount: "2", from: "PPP", to: "Dem", color: "2643A3" },
  { amount: "3", from: "Gerindra", to: "PKS", color: "FFA500" },
  { amount: "2", from: "PKB", to: "PAN", color: "0000FF" },
  { amount: "4", from: "PKPI", to: "PAN", color: "0000FF" },
  { amount: "2", from: "PKB", to: "PSI", color: "E6212A" },
  { amount: "4", from: "Gerindra", to: "Dem", color: "2643A3" },
  { amount: "2", from: "NasDem", to: "Dem", color: "2643A3" },
  { amount: "3", from: "Dem", to: "PAN", color: "0000FF" },
  { amount: "5", from: "NasDem", to: "PAN", color: "0000FF" },
  { amount: "4", from: "Hanura", to: "PKB", color: "00FF00" },
  { amount: "4", from: "PKB", to: "Hanura", color: "FF7F00" },
  { amount: "5", from: "Gerindra", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PAN", to: "Hanura", color: "FF7F00" },
  { amount: "6", from: "PKB", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PAN", to: "Dem", color: "2643A3" },
  { amount: "3", from: "PAN", to: "PBB", color: "005019" },
  { amount: "2", from: "PKPI", to: "Gerindra", color: "B79164" },
  { amount: "3", from: "Golkar", to: "Hanura", color: "FF7F00" },
  { amount: "4", from: "PPP", to: "Golkar", color: "FFFF00" },
  { amount: "2", from: "Golkar", to: "Perindo", color: "FFFFFF" },
  { amount: "2", from: "Gerindra", to: "Perindo", color: "FFFFFF" },
  { amount: "2", from: "PKPI", to: "NasDem", color: "27408B" },
  { amount: "2", from: "PKPI", to: "NasDem", color: "FFA73D" },
  { amount: "1", from: "NasDem", to: "PPP", color: "00A100" },
  { amount: "4", from: "PBB", to: "PKB", color: "00FF00" },
  { amount: "2", from: "PPP", to: "PBB", color: "005019" },
  { amount: "5", from: "Hanura", to: "PSI", color: "E6212A" },
  { amount: "2", from: "Gerindra", to: "PAN", color: "0000FF" },
  { amount: "12", from: "Hanura", to: "NasDem", color: "27408B" },
  { amount: "12", from: "Hanura", to: "NasDem", color: "FFA73D" },
  { amount: "2", from: "PKPI", to: "PDIP", color: "DB2016" },
  { amount: "2", from: "NasDem", to: "PSI", color: "E6212A" },
  { amount: "1", from: "PDIP", to: "PPP", color: "00A100" },
  { amount: "2", from: "Golkar", to: "PSI", color: "E6212A" },
  { amount: "3", from: "PKPI", to: "Golkar", color: "FFFF00" },
  { amount: "3", from: "Dem", to: "PPP", color: "00A100" },
  { amount: "5", from: "PKB", to: "NasDem", color: "27408B" },
  { amount: "5", from: "PKB", to: "NasDem", color: "FFA73D" },
  { amount: "1", from: "PPP", to: "Berkarya", color: "FF5F00" },
  { amount: "8", from: "Hanura", to: "Gerindra", color: "B79164" },
  { amount: "3", from: "Dem", to: "Perindo", color: "FFFFFF" },
  { amount: "2", from: "PBB", to: "Dem", color: "2643A3" },
  { amount: "1", from: "PDIP", to: "PAN", color: "0000FF" },
  { amount: "3", from: "NasDem", to: "PBB", color: "005019" },
  { amount: "1", from: "Hanura", to: "PBB", color: "005019" },
  { amount: "2", from: "PBB", to: "PAN", color: "0000FF" },
  { amount: "4", from: "Dem", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PPP", to: "PDIP", color: "DB2016" },
  { amount: "3", from: "PAN", to: "Gerindra", color: "B79164" },
  { amount: "1", from: "Gerindra", to: "PPP", color: "00A100" },
  { amount: "5", from: "PAN", to: "PKB", color: "00FF00" },
  { amount: "1", from: "PKPI", to: "Dem", color: "2643A3" },
  { amount: "2", from: "Dem", to: "Golkar", color: "FFFF00" },
  { amount: "9", from: "NasDem", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PAN", to: "PSI", color: "E6212A" },
  { amount: "2", from: "Hanura", to: "PDIP", color: "DB2016" },
  { amount: "1", from: "PAN", to: "PPP", color: "00A100" },
  { amount: "1", from: "NasDem", to: "PKPI", color: "E4000E" },
  { amount: "2", from: "PDIP", to: "Perindo", color: "FFFFFF" },
  { amount: "4", from: "PPP", to: "PKB", color: "00FF00" },
  { amount: "1", from: "PKB", to: "PKS", color: "FFA500" },
  { amount: "3", from: "Gerindra", to: "Golkar", color: "FFFF00" },
  { amount: "2", from: "PKS", to: "PAN", color: "0000FF" },
  { amount: "3", from: "Dem", to: "PDIP", color: "DB2016" },
  { amount: "1", from: "Golkar", to: "PDIP", color: "DB2016" },
  { amount: "2", from: "PDIP", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PBB", to: "Perindo", color: "FFFFFF" },
  { amount: "2", from: "PBB", to: "Partai Garuda", color: "B3282B" },
  { amount: "4", from: "Gerindra", to: "PKB", color: "00FF00" },
  { amount: "2", from: "PPP", to: "Hanura", color: "FF7F00" },
  { amount: "1", from: "PBB", to: "PKS", color: "FFA500" },
  { amount: "2", from: "PDIP", to: "Gerindra", color: "B79164" },
  { amount: "6", from: "Dem", to: "Gerindra", color: "B79164" },
  { amount: "3", from: "PPP", to: "PAN", color: "0000FF" },
  { amount: "3", from: "Dem", to: "PKB", color: "00FF00" },
  { amount: "2", from: "PPP", to: "NasDem", color: "27408B" },
  { amount: "2", from: "PPP", to: "NasDem", color: "FFA73D" },
  { amount: "1", from: "PKS", to: "PKB", color: "00FF00" },
  { amount: "1", from: "PPP", to: "PKS", color: "FFA500" },
  { amount: "6", from: "Gerindra", to: "NasDem", color: "27408B" },
  { amount: "6", from: "Gerindra", to: "NasDem", color: "FFA73D" },
  { amount: "1", from: "PPP", to: "PSI", color: "E6212A" },
  { amount: "3", from: "PAN", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "PKB", to: "Partai Garuda", color: "B3282B" },
  { amount: "1", from: "Gerindra", to: "Hanura", color: "FF7F00" },
  { amount: "3", from: "PDIP", to: "NasDem", color: "27408B" },
  { amount: "3", from: "PDIP", to: "NasDem", color: "FFA73D" },
  { amount: "3", from: "NasDem", to: "PDIP", color: "DB2016" },
  { amount: "1", from: "Dem", to: "PKS", color: "FFA500" },
  { amount: "2", from: "NasDem", to: "Gerindra", color: "B79164" },
  { amount: "1", from: "PBB", to: "Berkarya", color: "FF5F00" },
  { amount: "1", from: "Gerindra", to: "Partai Garuda", color: "B3282B" },
  { amount: "2", from: "Golkar", to: "NasDem", color: "27408B" },
  { amount: "2", from: "Golkar", to: "NasDem", color: "FFA73D" },
  { amount: "1", from: "PBB", to: "PPP", color: "00A100" },
  { amount: "1", from: "PKB", to: "Golkar", color: "FFFF00" },
  { amount: "1", from: "PDIP", to: "PKB", color: "00FF00" },
  { amount: "1", from: "Golkar", to: "PKB", color: "00FF00" },
  { amount: "1", from: "Golkar", to: "Gerindra", color: "B79164" },
  { amount: "1", from: "PKPI", to: "Hanura", color: "FF7F00" },
];