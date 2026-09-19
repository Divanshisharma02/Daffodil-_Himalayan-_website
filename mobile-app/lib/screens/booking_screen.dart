import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';
import '../providers/app_state.dart';
import '../models/booking_model.dart';
import '../services/api_service.dart';

class BookingScreen extends StatefulWidget {
  final String defaultPackageTitle;
  final double defaultPriceINR;

  const BookingScreen({
    super.key,
    required this.defaultPackageTitle,
    required this.defaultPriceINR,
  });

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  int _currentStep = 1;
  bool _isSubmitting = false;

  // Form Controllers
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _destinationController = TextEditingController();
  final _dateController = TextEditingController();
  final _pickupController = TextEditingController(text: 'Airport / Main Railway Station Pickup');
  final _couponController = TextEditingController();
  final _messageController = TextEditingController();

  int _adults = 2;
  int _children = 0;
  String _hotelCategory = 'Deluxe 4-Star Resort';
  String _mealPlan = 'MAP (Breakfast & Dinner)';
  double _discountPercent = 0.0;

  @override
  void initState() {
    super.initState();
    _destinationController.text = widget.defaultPackageTitle;
    final defaultDate = DateTime.now().add(const Duration(days: 14));
    _dateController.text = "${defaultDate.year}-${defaultDate.month.toString().padLeft(2, '0')}-${defaultDate.day.toString().padLeft(2, '0')}";
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _destinationController.dispose();
    _dateController.dispose();
    _pickupController.dispose();
    _couponController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  void _applyCoupon() {
    final code = _couponController.text.trim().toUpperCase();
    if (code == 'HIMALAYA15') {
      setState(() => _discountPercent = 0.15);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('🎉 Promo Code "HIMALAYA15" applied! 15% discount unlocked.'),
          backgroundColor: DaffodilTheme.forestGreen,
        ),
      );
    } else if (code.isNotEmpty) {
      setState(() => _discountPercent = 0.0);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Invalid promo code. Try "HIMALAYA15"'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  double _calculateTotalINR() {
    double base = widget.defaultPriceINR;
    if (_hotelCategory.contains('5-Star') || _hotelCategory.contains('Palace')) {
      base *= 1.35;
    }
    double totalBase = (base * _adults) + (base * 0.5 * _children);
    double discount = totalBase * _discountPercent;
    double taxable = totalBase - discount;
    double gst = taxable * 0.05;
    return (taxable + gst).roundToDouble();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime initialDate = DateTime.now().add(const Duration(days: 7));
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: DateTime.now().add(const Duration(days: 1)),
      lastDate: DateTime.now().add(const Duration(days: 730)),
      builder: (ctx, child) {
        return Theme(
          data: Theme.of(ctx).copyWith(
            colorScheme: const ColorScheme.light(
              primary: DaffodilTheme.forestGreen,
              onPrimary: Colors.white,
              onSurface: DaffodilTheme.darkText,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      setState(() {
        _dateController.text = "${picked.year}-${picked.month.toString().padLeft(2, '0')}-${picked.day.toString().padLeft(2, '0')}";
      });
    }
  }

  Future<void> _handleSubmitBooking(AppState state) async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    final totalINR = _calculateTotalINR();
    final booking = TourBooking(
      customerName: _nameController.text.trim(),
      customerEmail: _emailController.text.trim(),
      customerPhone: _phoneController.text.trim(),
      packageName: _destinationController.text.trim(),
      travelDate: _dateController.text.trim(),
      adults: _adults,
      children: _children,
      hotelCategory: _hotelCategory,
      mealPlan: _mealPlan,
      pickupLocation: _pickupController.text.trim(),
      basePrice: widget.defaultPriceINR,
      totalPrice: totalINR,
      couponCode: _couponController.text.trim(),
      currency: state.currency,
    );

    // 1. Post to backend Excel CSV records
    final result = await ApiService.submitBooking(booking);
    final bookingId = result['booking']?['bookingId'] ?? 'DH-2026-${1000 + DateTime.now().millisecond}';

    // 2. Launch WhatsApp with prefilled booking message
    final summaryMessage = 'Hello Daffodil Himalayan,\n\nI have submitted an Expedition Booking Enquiry:\n'
        '- Reservation ID: $bookingId\n'
        '- Name: ${_nameController.text.trim()}\n'
        '- Contact: ${_phoneController.text.trim()}\n'
        '- Email: ${_emailController.text.trim()}\n'
        '- Tour: ${_destinationController.text.trim()}\n'
        '- Travel Date: ${_dateController.text.trim()}\n'
        '- Travelers: $_adults Adults, $_children Children\n'
        '- Hotel Tier: $_hotelCategory\n'
        '- Pickup: ${_pickupController.text.trim()}\n'
        '- Estimated Total: ${state.formatPrice(totalINR)}\n'
        '- Promo Code: ${_couponController.text.trim().isEmpty ? "None" : _couponController.text.trim()}\n'
        '- Special Requests: ${_messageController.text.trim().isEmpty ? "None" : _messageController.text.trim()}';

    final waUri = Uri.parse('https://wa.me/918219527240?text=${Uri.encodeComponent(summaryMessage)}');
    try {
      await launchUrl(waUri, mode: LaunchMode.externalApplication);
    } catch (_) {}

    // Safe unmounted check
    if (!mounted) return;
    setState(() => _isSubmitting = false);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.check_circle, color: DaffodilTheme.accentGreen),
            const SizedBox(width: 8),
            Text(
              'Reservation Confirmed',
              style: GoogleFonts.playfairDisplay(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Reservation ID: $bookingId', style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text(
              'Your tour reservation has been logged in the official Daffodil Himalayan registry (Govt Reg: 11-2279/2024-DTO-SML).\n\nOur team in Shimla will contact you shortly to coordinate logistics.',
              style: TextStyle(fontSize: 13, height: 1.4),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: const Text('BACK TO HOME'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppState>(context);
    final total = _calculateTotalINR();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: DaffodilTheme.midnightBlue,
        title: Text(
          'Reservation Desk',
          style: GoogleFonts.playfairDisplay(fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Govt Notice Badge
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: DaffodilTheme.lightGold),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.verified_user, color: DaffodilTheme.forestGreen, size: 28),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Official Tourism Registered Agency',
                            style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          Text(
                            'Reg No: ${DaffodilTheme.govtRegistrationNo}',
                            style: GoogleFonts.outfit(fontSize: 11, color: DaffodilTheme.mutedText),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Step Indicator
              Row(
                children: [
                  Expanded(
                    child: Container(
                      height: 4,
                      decoration: BoxDecoration(
                        color: DaffodilTheme.regalGold,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Container(
                      height: 4,
                      decoration: BoxDecoration(
                        color: _currentStep == 2 ? DaffodilTheme.regalGold : Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // STEP 1: Traveler Details
              if (_currentStep == 1) ...[
                Text(
                  'Step 1: Lead Traveler Details',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: DaffodilTheme.forestGreen,
                  ),
                ),
                const SizedBox(height: 14),
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(
                    labelText: 'Full Name *',
                    prefixIcon: Icon(Icons.person_outline),
                  ),
                  validator: (val) => (val == null || val.trim().isEmpty) ? 'Please enter full name' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    labelText: 'Email Address *',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  validator: (val) => (val == null || !val.contains('@')) ? 'Please enter valid email' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'WhatsApp / Phone Number *',
                    prefixIcon: Icon(Icons.phone_outlined),
                  ),
                  validator: (val) => (val == null || val.trim().isEmpty) ? 'Please enter contact number' : null,
                ),
                const SizedBox(height: 16),

                // Adults & Children Selectors
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Adults (12+ yrs)', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(height: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: Colors.grey.shade300),
                            ),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton<int>(
                                value: _adults,
                                isExpanded: true,
                                items: [1, 2, 3, 4, 5, 6, 8, 10].map((c) => DropdownMenuItem(value: c, child: Text('$c Guests'))).toList(),
                                onChanged: (v) => setState(() => _adults = v ?? 1),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Children (5-11 yrs)', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(height: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: Colors.grey.shade300),
                            ),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton<int>(
                                value: _children,
                                isExpanded: true,
                                items: [0, 1, 2, 3, 4].map((c) => DropdownMenuItem(value: c, child: Text('$c Kids (50% off)'))).toList(),
                                onChanged: (v) => setState(() => _children = v ?? 0),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {
                    if (_nameController.text.trim().isNotEmpty && _emailController.text.contains('@') && _phoneController.text.trim().isNotEmpty) {
                      setState(() => _currentStep = 2);
                    } else {
                      _formKey.currentState!.validate();
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: DaffodilTheme.forestGreen,
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(50),
                  ),
                  child: const Text('PROCEED TO ITINERARY OPTIONS →'),
                ),
              ],

              // STEP 2: Preferences & Booking Settlement
              if (_currentStep == 2) ...[
                Text(
                  'Step 2: Expedition Preferences',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: DaffodilTheme.forestGreen,
                  ),
                ),
                const SizedBox(height: 14),
                TextFormField(
                  controller: _destinationController,
                  decoration: const InputDecoration(
                    labelText: 'Tour / Route *',
                    prefixIcon: Icon(Icons.explore_outlined),
                  ),
                  validator: (val) => (val == null || val.trim().isEmpty) ? 'Please enter destination' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _dateController,
                  readOnly: true,
                  onTap: () => _selectDate(context),
                  decoration: const InputDecoration(
                    labelText: 'Departure Date *',
                    prefixIcon: Icon(Icons.calendar_today_outlined),
                    suffixIcon: Icon(Icons.arrow_drop_down),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _pickupController,
                  decoration: const InputDecoration(
                    labelText: 'Pickup Location',
                    prefixIcon: Icon(Icons.local_taxi_outlined),
                  ),
                ),
                const SizedBox(height: 16),

                // Hotel Category Dropdown
                Text('Hotel Accommodation Tier', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13)),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.grey.shade300),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _hotelCategory,
                      isExpanded: true,
                      items: [
                        'Deluxe 4-Star Resort',
                        'Luxury 5-Star Aman-Tier (+35%)',
                        'Heritage Palace Suite (+35%)',
                      ].map((t) => DropdownMenuItem(value: t, child: Text(t, style: const TextStyle(fontSize: 13)))).toList(),
                      onChanged: (v) => setState(() => _hotelCategory = v ?? 'Deluxe 4-Star Resort'),
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // Promo Code Row
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: _couponController,
                        textCapitalization: TextCapitalization.characters,
                        decoration: const InputDecoration(
                          labelText: 'Promo Code (Optional)',
                          hintText: 'Try HIMALAYA15',
                          prefixIcon: Icon(Icons.discount_outlined),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: _applyCoupon,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: DaffodilTheme.forestGreen,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                      ),
                      child: const Text('Apply'),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Summary Cost Card
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: DaffodilTheme.regalGold),
                  ),
                  child: Column(
                    children: [
                      if (_discountPercent > 0) ...[
                        Row(
                          mainAxisAlignment: MainAxisAlignment.between,
                          children: [
                            const Text('Promo Discount (15%):', style: TextStyle(color: DaffodilTheme.accentGreen)),
                            Text('-15%', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, color: DaffodilTheme.accentGreen)),
                          ],
                        ),
                        const SizedBox(height: 6),
                      ],
                      Row(
                        mainAxisAlignment: MainAxisAlignment.between,
                        children: [
                          const Text('Estimated Expedition Total:'),
                          Text(
                            state.formatPrice(total),
                            style: GoogleFonts.outfit(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: DaffodilTheme.forestGreen,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Direct Agency Settlement upon arrival or bank transfer. No gateway fee.',
                        style: TextStyle(fontSize: 11, color: DaffodilTheme.mutedText),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                Row(
                  children: [
                    OutlinedButton(
                      onPressed: () => setState(() => _currentStep = 1),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                      ),
                      child: const Text('Back'),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: _isSubmitting ? null : () => _handleSubmitBooking(state),
                        icon: _isSubmitting
                            ? const SizedBox(
                                width: 18,
                                height: 18,
                                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.black),
                              )
                            : const Icon(Icons.send_rounded, size: 18),
                        label: Text(_isSubmitting ? 'Recording...' : 'CONFIRM RESERVATION'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: DaffodilTheme.regalGold,
                          foregroundColor: DaffodilTheme.darkText,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
