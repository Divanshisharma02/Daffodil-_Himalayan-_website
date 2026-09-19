class Destination {
  final String name;
  final String slug;
  final String category;
  final String stateOrCountry;
  final String heroImage;
  final String overview;
  final String? climate;
  final String? bestTimeToVisit;
  final double rating;
  final int reviewsCount;
  final double averageCostPerDayINR;
  final double averageCostPerDayUSD;

  Destination({
    required this.name,
    required this.slug,
    required this.category,
    required this.stateOrCountry,
    required this.heroImage,
    required this.overview,
    this.climate,
    this.bestTimeToVisit,
    this.rating = 4.9,
    this.reviewsCount = 200,
    this.averageCostPerDayINR = 6000.0,
    this.averageCostPerDayUSD = 80.0,
  });

  factory Destination.fromJson(Map<String, dynamic> json) {
    return Destination(
      name: json['name'] ?? '',
      slug: json['slug'] ?? '',
      category: json['category'] ?? 'Himalayan',
      stateOrCountry: json['stateOrCountry'] ?? 'India',
      heroImage: json['heroImage'] ?? 'images/himachal.jpg',
      overview: json['overview'] ?? '',
      climate: json['climate'],
      bestTimeToVisit: json['bestTimeToVisit'],
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 4.9,
      reviewsCount: json['reviewsCount'] is int ? json['reviewsCount'] : 200,
      averageCostPerDayINR: (json['averageCostPerDayINR'] is num) ? (json['averageCostPerDayINR'] as num).toDouble() : 6000.0,
      averageCostPerDayUSD: (json['averageCostPerDayUSD'] is num) ? (json['averageCostPerDayUSD'] as num).toDouble() : 80.0,
    );
  }
}
