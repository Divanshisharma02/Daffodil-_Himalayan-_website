class TourBooking {
  final String? bookingId;
  final String? packageId;
  final String customerName;
  final String customerEmail;
  final String customerPhone;
  final String packageName;
  final String travelDate;
  final int adults;
  final int children;
  final String hotelCategory;
  final String mealPlan;
  final String pickupLocation;
  final double basePrice;
  final double totalPrice;
  final String currency;
  final String couponCode;
  final String bookingStatus;

  TourBooking({
    this.bookingId,
    this.packageId,
    required this.customerName,
    required this.customerEmail,
    required this.customerPhone,
    required this.packageName,
    required this.travelDate,
    required this.adults,
    required this.children,
    required this.hotelCategory,
    required this.mealPlan,
    required this.pickupLocation,
    this.basePrice = 25000.0,
    required this.totalPrice,
    this.currency = 'INR',
    this.couponCode = '',
    this.bookingStatus = 'Confirmed',
  });

  Map<String, dynamic> toJson() {
    return {
      'packageId': packageId ?? 'pkg_custom',
      'customerName': customerName,
      'customerEmail': customerEmail,
      'customerPhone': customerPhone,
      'packageName': packageName,
      'travelDate': travelDate,
      'adults': adults,
      'children': children,
      'hotelCategory': hotelCategory,
      'mealPlan': mealPlan,
      'pickupLocation': pickupLocation,
      'basePrice': basePrice,
      'totalPrice': totalPrice,
      'currency': currency,
      'couponCode': couponCode,
      'paymentMethod': 'Direct Agency Booking',
    };
  }
}
