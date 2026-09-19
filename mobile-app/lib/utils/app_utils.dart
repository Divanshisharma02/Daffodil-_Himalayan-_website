class AppUtils {
  static const String cdnBaseUrl = 'http://localhost:5000';

  /// Resolves relative image paths (e.g. 'images/kashimr.jpg') to complete CDN URLs
  static String resolveImageUrl(String? path) {
    if (path == null || path.trim().isEmpty) {
      return 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80';
    }
    final trimmed = path.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    final cleanPath = trimmed.startsWith('/') ? trimmed.substring(1) : trimmed;
    return '$cdnBaseUrl/$cleanPath';
  }
}
