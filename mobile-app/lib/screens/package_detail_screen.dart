import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../providers/app_state.dart';
import '../models/package_model.dart';
import '../utils/app_utils.dart';
import 'booking_screen.dart';

class PackageDetailScreen extends StatelessWidget {
  final TourPackage package;

  const PackageDetailScreen({super.key, required this.package});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final heroImageUrl = AppUtils.resolveImageUrl(package.image);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: DaffodilTheme.midnightBlue,
        title: Text(
          package.title,
          style: GoogleFonts.playfairDisplay(fontSize: 16, fontWeight: FontWeight.bold),
          overflow: TextOverflow.ellipsis,
        ),
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 10,
              offset: const Offset(0, -3),
            ),
          ],
        ],
        child: SafeArea(
          child: Row(
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Per Guest (Tax incl.)',
                    style: GoogleFonts.outfit(fontSize: 11, color: DaffodilTheme.mutedText),
                  ),
                  Text(
                    package.formattedPrice(state.currency, state.exchangeRateUSD),
                    style: GoogleFonts.outfit(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: DaffodilTheme.forestGreen,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => BookingScreen(
                          defaultPackageTitle: package.title,
                          defaultPriceINR: package.priceINR,
                        ),
                      ),
                    );
                  },
                  icon: const Icon(Icons.calendar_month, size: 18),
                  label: const Text('RESERVE EXPEDITION'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: DaffodilTheme.regalGold,
                    foregroundColor: DaffodilTheme.darkText,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Image Header
            ClipRRect(
              borderRadius: BorderRadius.circular(14),
              child: Stack(
                children: [
                  Image.network(
                    heroImageUrl,
                    height: 220,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 220,
                      color: DaffodilTheme.forestGreen,
                      child: const Center(
                        child: Icon(Icons.landscape, size: 64, color: DaffodilTheme.regalGold),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: DaffodilTheme.forestGreen.withOpacity(0.9),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        package.country.toUpperCase(),
                        style: GoogleFonts.outfit(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  if (package.isBestSeller)
                    Positioned(
                      top: 12,
                      right: 12,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: DaffodilTheme.regalGold,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          'BEST SELLER',
                          style: GoogleFonts.outfit(
                            color: DaffodilTheme.darkText,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Header Info Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.grey.shade200),
              ],
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.schedule, size: 16, color: DaffodilTheme.forestGreen),
                          const SizedBox(width: 6),
                          Text(
                            '${package.durationDays} Days / ${package.durationNights} Nights',
                            style: GoogleFonts.outfit(fontSize: 13, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          const Icon(Icons.star, color: Colors.amber, size: 18),
                          const SizedBox(width: 4),
                          Text(
                            '${package.rating} (${package.reviewsCount} reviews)',
                            style: GoogleFonts.outfit(fontSize: 13, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    package.title,
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: DaffodilTheme.darkText,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.location_on, size: 16, color: DaffodilTheme.regalGold),
                      const SizedBox(width: 4),
                      Text(
                        package.destination,
                        style: GoogleFonts.outfit(fontSize: 13, color: DaffodilTheme.mutedText),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Text(
                    package.overview,
                    style: GoogleFonts.outfit(
                      fontSize: 14,
                      color: DaffodilTheme.darkText,
                      height: 1.45,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Itinerary Flow Chart Nodes
            Text(
              'Interactive Itinerary Route',
              style: GoogleFonts.playfairDisplay(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: DaffodilTheme.forestGreen,
              ),
            ),
            const SizedBox(height: 12),

            if (package.itinerary.isEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text('Detailed custom itinerary tailored upon confirmation.'),
              )
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: package.itinerary.length,
                itemBuilder: (ctx, idx) {
                  final step = package.itinerary[idx];
                  final isLast = idx == package.itinerary.length - 1;
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Node Timeline Indicator
                      Column(
                        children: [
                          Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: DaffodilTheme.forestGreen,
                              shape: BoxShape.circle,
                              border: Border.all(color: DaffodilTheme.regalGold, width: 2),
                            ),
                            child: Center(
                              child: Text(
                                '${step.day}',
                                style: GoogleFonts.outfit(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          ),
                          if (!isLast)
                            Container(
                              width: 2,
                              height: 60,
                              color: DaffodilTheme.regalGold.withOpacity(0.5),
                            ),
                        ],
                      ),
                      const SizedBox(width: 14),
                      // Step Content
                      Expanded(
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 16),
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: Colors.grey.shade200),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                step.title,
                                style: GoogleFonts.playfairDisplay(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: DaffodilTheme.darkText,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                step.description,
                                style: GoogleFonts.outfit(
                                  fontSize: 13,
                                  color: DaffodilTheme.mutedText,
                                  height: 1.3,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),

            const SizedBox(height: 20),

            // Inclusions & Exclusions Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.grey.shade200),
              ],
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'What is Included',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: DaffodilTheme.accentGreen,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...package.inclusions.map(
                    (inc) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle, color: DaffodilTheme.accentGreen, size: 16),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(inc, style: GoogleFonts.outfit(fontSize: 13)),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const Divider(height: 24),
                  Text(
                    'Exclusions',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: Colors.red.shade700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ...package.exclusions.map(
                    (exc) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        children: [
                          Icon(Icons.cancel, color: Colors.red.shade700, size: 16),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(exc, style: GoogleFonts.outfit(fontSize: 13)),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}
