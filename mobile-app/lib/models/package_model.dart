class ItineraryStep {
  final int day;
  final String title;
  final String description;
  final String? icon;

  ItineraryStep({
    required this.day,
    required this.title,
    required this.description,
    this.icon,
  });

  factory ItineraryStep.fromJson(Map<String, dynamic> json) {
    return ItineraryStep(
      day: json['day'] is int ? json['day'] : int.tryParse('${json['day']}') ?? 1,
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      icon: json['icon'],
    );
  }
}

class TourPackage {
  final String id;
  final String title;
  final String slug;
  final String destination;
  final String country;
  final int durationDays;
  final int durationNights;
  final double priceINR;
  final double rating;
  final int reviewsCount;
  final String image;
  final String overview;
  final List<String> inclusions;
  final List<String> exclusions;
  final List<ItineraryStep> itinerary;
  final bool isBestSeller;
  final bool isLuxury;
  final bool isTempleTour;
  final bool isAdventure;

  TourPackage({
    required this.id,
    required this.title,
    required this.slug,
    required this.destination,
    required this.country,
    required this.durationDays,
    required this.durationNights,
    required this.priceINR,
    required this.rating,
    required this.reviewsCount,
    required this.image,
    required this.overview,
    required this.inclusions,
    required this.exclusions,
    required this.itinerary,
    this.isBestSeller = false,
    this.isLuxury = false,
    this.isTempleTour = false,
    this.isAdventure = false,
  });

  factory TourPackage.fromJson(Map<String, dynamic> json) {
    final badges = json['badges'] as Map<String, dynamic>? ?? {};
    final rawItinerary = json['itinerary'] as List<dynamic>? ?? [];

    return TourPackage(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      slug: json['slug'] ?? '',
      destination: json['destination'] ?? '',
      country: json['country'] ?? 'India',
      durationDays: json['durationDays'] is int ? json['durationDays'] : int.tryParse('${json['durationDays']}') ?? 5,
      durationNights: json['durationNights'] is int ? json['durationNights'] : int.tryParse('${json['durationNights']}') ?? 4,
      priceINR: (json['priceINR'] is num) ? (json['priceINR'] as num).toDouble() : double.tryParse('${json['priceINR']}') ?? 25000.0,
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 4.9,
      reviewsCount: json['reviewsCount'] is int ? json['reviewsCount'] : int.tryParse('${json['reviewsCount']}') ?? 120,
      image: json['image'] ?? 'images/himachal.jpg',
      overview: json['overview'] ?? '',
      inclusions: (json['inclusions'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      exclusions: (json['exclusions'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      itinerary: rawItinerary.map((i) => ItineraryStep.fromJson(i as Map<String, dynamic>)).toList(),
      isBestSeller: badges['isBestSeller'] == true,
      isLuxury: badges['isLuxury'] == true,
      isTempleTour: badges['isTempleTour'] == true,
      isAdventure: badges['isAdventure'] == true,
    );
  }

  String formattedPrice(String currency, double exchangeRateUSD) {
    if (currency == 'USD') {
      final usd = (priceINR * exchangeRateUSD).round();
      return '\$$usd';
    }
    return '₹${priceINR.round()}';
  }
}
