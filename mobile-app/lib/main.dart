import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/app_state.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
      ],
      child: const DaffodilHimalayanApp(),
    ),
  );
}

class DaffodilHimalayanApp extends StatelessWidget {
  const DaffodilHimalayanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Daffodil Himalayan',
      debugShowCheckedModeBanner: false,
      theme: DaffodilTheme.lightTheme,
      home: const SplashScreen(),
    );
  }
}
