import 'package:flutter/material.dart';
import '../models/package_model.dart';
import '../models/destination_model.dart';
import '../services/api_service.dart';

class AppState extends ChangeNotifier {
  String _currency = 'INR';
  final double _exchangeRateUSD = 0.012; // 1 INR = 0.012 USD

  List<TourPackage> _packages = [];
  List<Destination> _destinations = [];
  bool _isLoading = false;
  String _selectedCategory = 'All';
  String _searchQuery = '';

  String get currency => _currency;
  double get exchangeRateUSD => _exchangeRateUSD;
  List<TourPackage> get packages => _filteredPackages();
  List<Destination> get destinations => _destinations;
  bool get isLoading => _isLoading;
  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;

  AppState() {
    loadData();
  }

  void setCurrency(String newCurrency) {
    if (_currency != newCurrency) {
      _currency = newCurrency;
      notifyListeners();
    }
  }

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void clearSearch() {
    _searchQuery = '';
    notifyListeners();
  }

  List<TourPackage> _filteredPackages() {
    List<TourPackage> list = _packages;

    if (_selectedCategory == 'Temple') {
      list = list.where((p) => p.isTempleTour).toList();
    } else if (_selectedCategory == 'Adventure') {
      list = list.where((p) => p.isAdventure).toList();
    } else if (_selectedCategory == 'Luxury') {
      list = list.where((p) => p.isLuxury).toList();
    }

    if (_searchQuery.trim().isNotEmpty) {
      final q = _searchQuery.trim().toLowerCase();
      list = list.where((p) =>
        p.title.toLowerCase().contains(q) ||
        p.destination.toLowerCase().contains(q) ||
        p.country.toLowerCase().contains(q) ||
        p.overview.toLowerCase().contains(q)
      ).toList();
    }

    return list;
  }

  Future<void> loadData() async {
    _isLoading = true;
    notifyListeners();

    try {
      final results = await Future.wait([
        ApiService.fetchPackages(),
        ApiService.fetchDestinations(),
      ]);

      _packages = results[0] as List<TourPackage>;
      _destinations = results[1] as List<Destination>;
    } catch (_) {
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  String formatPrice(double priceINR) {
    if (_currency == 'USD') {
      final usd = (priceINR * _exchangeRateUSD).round();
      return '\$$usd';
    }
    return '₹${priceINR.round()}';
  }
}
