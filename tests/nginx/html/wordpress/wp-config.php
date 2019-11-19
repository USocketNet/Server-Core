<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'usocketnet' );

/** MySQL database username */
define( 'DB_USER', 'admin' );

/** MySQL database password */
define( 'DB_PASSWORD', 'admin' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'J|J+u mhl?(ytrrYIh3h{AFw=P?3k5A ]48!QQ}.Yoz/l!]WaqGf09zk`uYQyB),' );
define( 'SECURE_AUTH_KEY',  'Gn65{tdF:SF}5/3|hge&X;CUT60gxEQ+*6->|;zqWTp YvnTqblOp<PyKN&LU_*!' );
define( 'LOGGED_IN_KEY',    'S+)GT7WtRK-BY?Y{.N5qrG,oXxMVmyA|m%?~y8MDVA*opRTc~7-J{?CRh3(,$`V[' );
define( 'NONCE_KEY',        '5 }S0ArT;bV_{=,Es%.nsMXW{mm^{3zf+WcBDMNtMk7PMVy)ZjfElnOfeGxEvj_H' );
define( 'AUTH_SALT',        ':sSLz[_o=<<~tC&No&Zg^Ds-Qs9C{ ?{Z7>CrhP[R6JqM#mE%F#.Zy]QRz.S$K]I' );
define( 'SECURE_AUTH_SALT', 'WX=t86NFH}!n0gOD/,b_?4P@uy6^9}#<R.ZxZ3)Tp-h{4/?[vZ^<M&wY*JYa`-8Z' );
define( 'LOGGED_IN_SALT',   ',/c12OtI`Vrpz]e;x|E)?$wzdxVrZb7 %RG[yiz/0w]`ok&$-H[{lS#b:!pLX]6+' );
define( 'NONCE_SALT',       'zE@2(yfQtOgzB2uLP%oeN~YZrNv$mHoLL}+bGUh(D9q4$/S{(6u8Y,,LZBerpY[t' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
