import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DaffodilTheme {
  // Brand Color Palette
  static const Color forestGreen = Color(0xFF0B3D2E);
  static const Color midnightBlue = Color(0xFF0B1F3A);
  static const Color regalGold = Color(0xFFD4AF37);
  static const Color lightGold = Color(0xFFF3E5AB);
  static const Color ivoryBackground = Color(0xFFFBF9F5);
  static const Color surfaceCard = Color(0xFFFFFFFF);
  static const Color darkText = Color(0xFF1C120C);
  static const Color mutedText = Color(0xFF6B7280);
  static const Color accentGreen = Color(0xFF198754);

  // Government Registration ID
  static const String govtRegistrationNo = '11-2279/2024-DTO-SML';
  static const String officialPhone = '+91 8219527240';
  static const String officialEmail = 'daffodilhimalayan@gmail.com';

  static ThemeData get lightTheme {
    final base = ThemeData.light();
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: ivoryBackground,
      primaryColor: forestGreen,
      colorScheme: const ColorScheme.light(
        primary: forestGreen,
        secondary: regalGold,
        surface: surfaceCard,
        onPrimary: Colors.white,
        onSecondary: darkText,
        onSurface: darkText,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: midnightBlue,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      textTheme: GoogleFonts.outfitTextTheme(base.textTheme).copyWith(
        displayLarge: GoogleFonts.playfairDisplay(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: forestGreen,
        ),
        headlineMedium: GoogleFonts.playfairDisplay(
          fontSize: 24,
          fontWeight: FontWeight.w700,
          color: forestGreen,
        ),
        titleLarge: GoogleFonts.playfairDisplay(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: darkText,
        ),
        bodyLarge: GoogleFonts.outfit(
          fontSize: 15,
          color: darkText,
        ),
        bodyMedium: GoogleFonts.outfit(
          fontSize: 13,
          color: mutedText,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: regalGold,
          foregroundColor: darkText,
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          textStyle: GoogleFonts.outfit(
            fontWeight: FontWeight.bold,
            letterSpacing: 0.8,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: regalGold, width: 2),
        ),
      ),
    );
  }
}
