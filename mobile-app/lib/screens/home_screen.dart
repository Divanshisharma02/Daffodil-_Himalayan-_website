import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../providers/app_state.dart';
import '../models/package_model.dart';
import '../models/destination_model.dart';
import '../utils/app_utils.dart';
import 'package_detail_screen.dart';
import 'booking_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _launchWhatsApp(BuildContext context) async {
    final uri = Uri.parse(
      'https://wa.me/918219527240?text=${Uri.encodeComponent("Hello Daffodil Himalayan, I would like to inquire about a customized tour package.")}',
    );
    try {
      final launched = await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!launched && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open WhatsApp (+91 8219527240)')),
        );
      }
    } catch (_) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open WhatsApp (+91 8219527240)')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: DaffodilTheme.midnightBlue,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  'DAFFODIL ',
                  style: GoogleFonts.playfairDisplay(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    letterSpacing: 1.2,
                    color: Colors.white,
                  ),
                ),
                Text(
                  'HIMALAYAN',
                  style: GoogleFonts.playfairDisplay(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    letterSpacing: 1.2,
                    color: DaffodilTheme.regalGold,
                  ),
                ),
              ],
            ),
            Text(
              'Govt Reg: ${DaffodilTheme.govtRegistrationNo}',
              style: GoogleFonts.outfit(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: DaffodilTheme.lightGold,
              ),
            ),
          ],
        ),
        actions: [
          // Currency Selector Dropdown
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.12),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: DaffodilTheme.regalGold.withOpacity(0.4)),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: state.currency,
                dropdownColor: DaffodilTheme.midnightBlue,
                icon: const Icon(Icons.arrow_drop_down, color: DaffodilTheme.regalGold),
                items: const [
                  DropdownMenuItem(
                    value: 'INR',
                    child: Text('₹ INR', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  ),
                  DropdownMenuItem(
                    value: 'USD',
                    child: Text('\$ USD', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  ),
                ],
                onChanged: (val) {
                  if (val != null) state.setCurrency(val);
                },
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _launchWhatsApp(context),
        backgroundColor: const Color(0xFF25D366),
        icon: const Icon(Icons.chat_bubble_outline, color: Colors.white),
        label: Text(
          'WhatsApp Desk',
          style: GoogleFonts.outfit(fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
      body: state.isLoading
          ? const Center(
              child: CircularProgressIndicator(color: DaffodilTheme.forestGreen),
            )
          : RefreshIndicator(
              color: DaffodilTheme.forestGreen,
              onRefresh: () => state.loadData(),
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Search Bar Pill
                    _buildSearchBar(state),
                    const SizedBox(height: 14),

                    // Hero Banner Card
                    _buildHeroBanner(context),
                    const SizedBox(height: 18),

                    // Filter Pills
                    _buildCategoryPills(state),
                    const SizedBox(height: 20),

                    // Section: Curated Packages
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          Text(
                            state.searchQuery.isEmpty ? 'Featured Expeditions' : 'Search Results',
                            style: GoogleFonts.playfairDisplay(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: DaffodilTheme.forestGreen,
                            ),
                          ),
                          Text(
                            '${state.packages.length} Packages',
                            style: GoogleFonts.outfit(
                              fontSize: 13,
                              color: DaffodilTheme.mutedText,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Packages List
                    if (state.packages.isEmpty)
                      _buildEmptyState(state)
                    else
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: state.packages.length,
                        itemBuilder: (ctx, idx) {
                          return _buildPackageCard(context, state.packages[idx], state);
                        },
                      ),

                    const SizedBox(height: 24),

                    // Section: Featured Destinations
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'Iconic Himalayan Sanctuaries',
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: DaffodilTheme.forestGreen,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildDestinationsList(state),
                    const SizedBox(height: 60),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildSearchBar(AppState state) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: DaffodilTheme.lightGold),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: TextField(
          controller: _searchController,
          onChanged: (query) => state.setSearchQuery(query),
          decoration: InputDecoration(
            hintText: 'Search Kashmir, Kedarnath, Manali, Spiti...',
            hintStyle: GoogleFonts.outfit(fontSize: 13, color: Colors.grey.shade500),
            prefixIcon: const Icon(Icons.search, color: DaffodilTheme.forestGreen),
            suffixIcon: _searchController.text.isNotEmpty
                ? IconButton(
                    icon: const Icon(Icons.clear, size: 18, color: Colors.grey),
                    onPressed: () {
                      _searchController.clear();
                      state.clearSearch();
                    },
                  )
                : null,
            contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            border: InputBorder.none,
            enabledBorder: InputBorder.none,
            focusedBorder: InputBorder.none,
          ),
        ),
      ),
    );
  }

  Widget _buildHeroBanner(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: DaffodilTheme.forestGreen,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.12),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.star, color: DaffodilTheme.regalGold, size: 18),
              const SizedBox(width: 6),
              Text(
                'GOVT LICENSED TOURISM DESK',
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: DaffodilTheme.regalGold,
                  letterSpacing: 1.0,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'Explore the Wonderland with Pride',
            style: GoogleFonts.playfairDisplay(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              height: 1.25,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Bespoke Himalayan tours, Char Dham pilgrimage, luxury Dal Lake houseboats, and snow expeditions.',
            style: GoogleFonts.outfit(
              fontSize: 13,
              color: Colors.white.withOpacity(0.85),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const BookingScreen(
                    defaultPackageTitle: 'Custom Himalayan Expedition',
                    defaultPriceINR: 35000,
                  ),
                ),
              );
            },
            icon: const Icon(Icons.calendar_today_outlined, size: 16),
            label: const Text('CUSTOM TOUR ENQUIRY'),
            style: ElevatedButton.styleFrom(
              backgroundColor: DaffodilTheme.regalGold,
              foregroundColor: DaffodilTheme.darkText,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryPills(AppState state) {
    final categories = [
      {'key': 'All', 'label': 'All Tours'},
      {'key': 'Temple', 'label': 'Sacred Yatras'},
      {'key': 'Adventure', 'label': 'Adventure'},
      {'key': 'Luxury', 'label': 'Luxury'}
    ];

    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: categories.length,
        itemBuilder: (ctx, idx) {
          final cat = categories[idx];
          final isSelected = state.selectedCategory == cat['key'];
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: FilterChip(
              selected: isSelected,
              label: Text(
                cat['label']!,
                style: GoogleFonts.outfit(
                  fontSize: 13,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  color: isSelected ? Colors.white : DaffodilTheme.darkText,
                ),
              ),
              backgroundColor: Colors.white,
              selectedColor: DaffodilTheme.forestGreen,
              checkmarkColor: DaffodilTheme.regalGold,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
                side: BorderSide(
                  color: isSelected ? DaffodilTheme.forestGreen : Colors.grey.shade300,
                ),
              ),
              onSelected: (_) => state.setCategory(cat['key']!),
            ),
          );
        },
      ),
    );
  }

  Widget _buildPackageCard(BuildContext context, TourPackage pkg, AppState state) {
    final imageUrl = AppUtils.resolveImageUrl(pkg.image);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: DaffodilTheme.lightGold.withOpacity(0.6)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => PackageDetailScreen(package: pkg),
              ),
            );
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Package Image with Badge Overlay
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(14)),
                child: Stack(
                  children: [
                    Image.network(
                      imageUrl,
                      height: 170,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => Container(
                        height: 170,
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            colors: [DaffodilTheme.forestGreen, DaffodilTheme.midnightBlue],
                          ),
                        ),
                        child: const Center(
                          child: Icon(Icons.landscape, color: DaffodilTheme.regalGold, size: 48),
                        ),
                      ),
                      loadingBuilder: (ctx, child, progress) {
                        if (progress == null) return child;
                        return Container(
                          height: 170,
                          color: Colors.grey.shade100,
                          child: const Center(
                            child: SizedBox(
                              width: 24,
                              height: 24,
                              child: CircularProgressIndicator(strokeWidth: 2, color: DaffodilTheme.forestGreen),
                            ),
                          ),
                        );
                      },
                    ),
                    Positioned(
                      top: 10,
                      left: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: DaffodilTheme.forestGreen.withOpacity(0.9),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          '${pkg.durationDays}D / ${pkg.durationNights}N',
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    if (pkg.isBestSeller)
                      Positioned(
                        top: 10,
                        right: 10,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: DaffodilTheme.regalGold,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            'BEST SELLER',
                            style: GoogleFonts.outfit(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: DaffodilTheme.darkText,
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          pkg.destination,
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: DaffodilTheme.forestGreen,
                          ),
                        ),
                        Row(
                          children: [
                            const Icon(Icons.star, color: Colors.amber, size: 16),
                            const SizedBox(width: 4),
                            Text(
                              '${pkg.rating}',
                              style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      pkg.title,
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                        color: DaffodilTheme.darkText,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      pkg.overview,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: GoogleFonts.outfit(
                        fontSize: 13,
                        color: DaffodilTheme.mutedText,
                        height: 1.3,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Divider(height: 1),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Starting at',
                              style: GoogleFonts.outfit(fontSize: 11, color: DaffodilTheme.mutedText),
                            ),
                            Text(
                              pkg.formattedPrice(state.currency, state.exchangeRateUSD),
                              style: GoogleFonts.outfit(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: DaffodilTheme.forestGreen,
                              ),
                            ),
                          ],
                        ),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => PackageDetailScreen(package: pkg),
                              ),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: DaffodilTheme.regalGold,
                            foregroundColor: DaffodilTheme.darkText,
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            minimumSize: Size.zero,
                          ),
                          child: const Text('View Itinerary'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState(AppState state) {
    return Container(
      padding: const EdgeInsets.all(32),
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Center(
        child: Column(
          children: [
            const Icon(Icons.search_off, size: 48, color: DaffodilTheme.regalGold),
            const SizedBox(height: 12),
            Text(
              'No packages matching "${state.searchQuery}"',
              textAlign: TextAlign.center,
              style: GoogleFonts.playfairDisplay(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(
              'We create bespoke itineraries for any Himalayan destination.',
              textAlign: TextAlign.center,
              style: GoogleFonts.outfit(fontSize: 12, color: DaffodilTheme.mutedText),
            ),
            const SizedBox(height: 14),
            OutlinedButton(
              onPressed: () {
                _searchController.clear();
                state.clearSearch();
              },
              child: const Text('Clear Filter'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDestinationsList(AppState state) {
    return SizedBox(
      height: 150,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: state.destinations.length,
        itemBuilder: (ctx, idx) {
          final dest = state.destinations[idx];
          return _buildDestinationCard(dest);
        },
      ),
    );
  }

  Widget _buildDestinationCard(Destination dest) {
    final imageUrl = AppUtils.resolveImageUrl(dest.heroImage);

    return Container(
      width: 190,
      margin: const EdgeInsets.only(right: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.network(
              imageUrl,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                color: DaffodilTheme.forestGreen,
                child: const Center(
                  child: Icon(Icons.landscape, color: DaffodilTheme.regalGold),
                ),
              ),
            ),
            // Gradient Overlay
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withOpacity(0.15),
                    Colors.black.withOpacity(0.75),
                  ],
                ),
              ),
            ),
            // Content
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: DaffodilTheme.regalGold,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      dest.category,
                      style: GoogleFonts.outfit(
                        fontSize: 9,
                        fontWeight: FontWeight.bold,
                        color: DaffodilTheme.darkText,
                      ),
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        dest.name,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          const Icon(Icons.star, color: Colors.amber, size: 12),
                          const SizedBox(width: 4),
                          Text(
                            '${dest.rating}',
                            style: GoogleFonts.outfit(fontSize: 11, color: Colors.white70),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
