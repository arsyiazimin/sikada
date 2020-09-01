/*
 Navicat Premium Data Transfer

 Source Server         : db_local
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : db_sikada

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 01/09/2020 22:02:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for m_dpt
-- ----------------------------
DROP TABLE IF EXISTS `m_dpt`;
CREATE TABLE `m_dpt`  (
  `id_dpt` int(11) NOT NULL AUTO_INCREMENT,
  `no_kk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nik` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tempat_lahir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tanggal_lahir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jenis_kelamin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rt` int(11) NULL DEFAULT NULL,
  `rw` int(11) NULL DEFAULT NULL,
  `id_kecamatan` int(11) NULL DEFAULT NULL,
  `id_kelurahan` int(11) NULL DEFAULT NULL,
  `id_tps` int(11) NULL DEFAULT NULL,
  `create_id` int(11) NULL DEFAULT NULL,
  `create_date` datetime(0) NULL DEFAULT NULL,
  `update_id` int(11) NULL DEFAULT NULL,
  `update_date` datetime(0) NULL DEFAULT NULL,
  `status_id` int(11) NULL DEFAULT 0,
  `id_tim` int(11) NULL DEFAULT NULL,
  `ketua_bit` int(11) NULL DEFAULT 0,
  `anggota_bit` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id_dpt`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 451 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_dpt
-- ----------------------------
INSERT INTO `m_dpt` VALUES (401, '7302012501******', '7302012501******', 'JAMALUDDIN', 'BULUKUMBA', '25|01|****', 'P', NULL, 'JL.T.A.GANI', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (402, '7303010103******', '7303013112******', 'RABANAI', 'BANTAENG', '31|12|****', 'L', NULL, 'PUNDINGIN', 2, 0, 1, 4, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (403, '7303010104******', '7303025712******', 'SUHRIAH SH. M.SI', 'BANTAENG', '17|12|****', 'P', NULL, 'JL. T. A. GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (404, '7303010103******', '7303015207******', 'HJ PALANIA', 'BANTAENG', '12|07|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (405, '7303010109******', '7303010403******', 'H ARIFUDDIN', 'BANTAENG', '04|03|****', 'L', NULL, 'T. A. GANI III', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (406, '7303010107******', '7303010605******', 'AGUS H', 'BANTAENG', '06|05|****', 'L', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:41', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (407, '7303010109******', '7303012606******', 'MUH FAUSAN AL WAHIDIN HA', 'UJUNG PANDANG', '26|06|****', 'L', NULL, 'T. A. GANI III', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (408, '7303010107******', '7303016509******', 'RAHMATIAH', 'BANTAENG', '25|09|****', 'P', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (409, '7303010109******', '7303017112******', 'MANTANG', 'BANTAENG', '31|12|****', 'P', NULL, 'T. A. GANI III', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (410, '7303010107******', '7303013112******', 'GAJANG', 'PUNDINGIN', '31|12|****', 'L', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (411, '7303010202******', '7303010407******', 'MUH. RHEDZA', 'BANTAENG', '04|07|****', 'L', NULL, 'JL. T.A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (412, '7303010107******', '7303015306******', 'MASI', 'PUNDINGIN', '13|06|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (413, '7303010202******', '7303015503******', 'IRMA ERFIANA MALIK', 'BANTAENG', '25|03|****', 'P', NULL, 'JL.T.A.GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (414, '7303010107******', '7303017112******', 'NURAENI', 'BANTAENG', '31|12|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (415, '7303010204******', '7303010407******', 'HARDING', 'BANTAENG', '04|07|****', 'L', NULL, 'JL T A GANI', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (416, '7303010107******', '7303011207******', 'BASO', 'BANTAENG', '12|07|****', 'L', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (417, '7303010204******', '7303015502******', 'NURHAYATI SALAM', 'BANTAENG', '15|02|****', 'P', NULL, 'JL T A GANI', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (418, '7303010107******', '7303017011******', 'SAMSIA', 'BANTAENG', '30|11|****', 'P', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (419, '7303010210******', '7303010205******', 'HASRUL ISMAN', 'POLMAS', '02|05|****', 'L', NULL, 'JL T A GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (420, '7303010107******', '7303010705******', 'BAHYU', 'BANTAENG', '07|05|****', 'L', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (421, '7303010210******', '7303012002******', 'HAERUL IRHAM', 'POLMAS', '20|02|****', 'L', NULL, 'JL T A GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:42', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (422, '7303010107******', '7303015008******', 'SUMARNI', 'BANTAENG', '10|08|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (423, '7303010210******', '7303014302******', 'KAMISA', 'BANTAENG', '03|02|****', 'P', NULL, 'JL T A GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (424, '7303010107******', '7303015207******', 'ALLA', 'BANTAENG', '12|07|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (425, '7303010212******', '7303011701******', 'SUL RESKY ANANDA', 'KENDARI', '17|01|****', 'L', NULL, 'KOMPLEKS TERMINAL BARU', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (426, '7303010107******', '7303011102******', 'H RAENI', 'BANTAENG', '11|02|****', 'L', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (427, '7303010212******', '7303012707******', 'ADRIAN ARSYAD', 'BANTAENG', '27|07|****', 'L', NULL, 'KOMPLEKS TERMINAL BARU', 1, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (428, '7303010107******', '7303011210******', 'ARDIANSYAH', 'BANTAENG', '12|10|****', 'L', NULL, 'PUNDINGIN', 2, 0, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (429, '7303010308******', '7303010204******', 'TAKDIR NAIPON', 'BANTAENG', '28|04|****', 'L', NULL, 'JL. T. A. GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (430, '7303010107******', '7303017112******', 'HJ BAU', 'BANTAENG', '31|12|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (431, '7303010308******', '7303011108******', 'ABDUL MALIK NAIPON', 'SANANA', '11|08|****', 'L', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (432, '7303010207******', '7303013112******', 'MUSTAFA', 'BANTAENG', '31|12|****', 'L', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (433, '7303010308******', '7303012909******', 'TAUFIK NAIPON', 'BANTAENG', '29|09|****', 'L', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (434, '7303010207******', '7303017112******', 'RASIA', 'BANTAENG', '31|12|****', 'P', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (435, '7303010308******', '7303013005******', 'TAKMIL NAIPON', 'BANTAENG', '30|05|****', 'L', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (436, '7303010308******', '7303012505******', 'KAMARUDDIN', 'BANTAENG', '25|05|****', 'L', NULL, 'PUNDINGIN', 2, 0, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (437, '7303010308******', '7303016104******', 'RAFIKA NAIPON', 'BANTAENG', '21|04|****', 'P', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (438, '7303010308******', '7303015505******', 'SURIANA', 'BANTAENG', '15|05|****', 'P', NULL, 'PUNDINGIN', 2, 0, 1, 4, 5, 1, '2020-08-16 15:52:43', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (439, '7303010308******', '7303016607******', 'ERVINA MALIK', 'BANTAENG', '26|07|****', 'P', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (440, '7303010308******', '7303016505******', 'HAMSIAH', 'BANTAENG', '25|05|****', 'P', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (441, '7303010308******', '7303017112******', 'AISYAH', 'BANTAENG', '31|12|****', 'P', NULL, 'JL T A GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (442, '7303010308******', '7303012304******', 'FAJAR NUR', 'BANTAENG', '23|04|****', 'L', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (443, '7303010308******', '7303011807******', 'KUSNADI', 'BANTAENG', '18|07|****', 'L', NULL, 'JL.TA GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (444, '7303010308******', '7303013112******', 'H. SAMU', 'BANTAENG', '31|12|****', 'L', NULL, 'PUNDINGIN', 2, 0, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (445, '7303010308******', '7303015507******', 'FITRIA NINGSIH', 'BANTAENG', '15|07|****', 'P', NULL, 'JL.TA GANI', 3, 1, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (446, '7303010308******', '7303014909******', 'NUR INAYAH', 'BANTAENG', '09|09|****', 'P', NULL, 'PUNDINGIN II', 0, 2, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (447, '7303010312******', '7303012503******', 'ASHMAN', 'BANTAENG', '25|03|****', 'L', NULL, 'JL T.A GANI', 4, 1, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (448, '7303010308******', '7303017112******', 'HJ SAMSI', 'BANTAENG', '31|12|****', 'P', NULL, 'PUNDINGIN II', 0, 0, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (449, '7303010312******', '7303014101******', 'ST.NASIAH', 'BANTAENG', '01|01|****', 'P', NULL, 'JL T.A GANI', 0, 0, 1, 3, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);
INSERT INTO `m_dpt` VALUES (450, '7303010308******', '7303010505******', 'ASRI', 'BANTAENG', '05|05|****', 'L', NULL, 'PUNDINGIN', 2, 1, 1, 4, 5, 1, '2020-08-16 15:52:44', NULL, NULL, NULL, NULL, 0, 0);

-- ----------------------------
-- Table structure for m_kecamatan
-- ----------------------------
DROP TABLE IF EXISTS `m_kecamatan`;
CREATE TABLE `m_kecamatan`  (
  `id_kecamatan` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kecamatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id_kecamatan`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_kecamatan
-- ----------------------------
INSERT INTO `m_kecamatan` VALUES (1, 'Bissappu', NULL);

-- ----------------------------
-- Table structure for m_kelurahan
-- ----------------------------
DROP TABLE IF EXISTS `m_kelurahan`;
CREATE TABLE `m_kelurahan`  (
  `id_kelurahan` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kelurahan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_kecamatan` int(11) NULL DEFAULT NULL,
  `status_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id_kelurahan`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_kelurahan
-- ----------------------------
INSERT INTO `m_kelurahan` VALUES (3, 'Bonto Atu', 1, 1);
INSERT INTO `m_kelurahan` VALUES (4, 'Bonto Cinde', 1, 1);

-- ----------------------------
-- Table structure for m_menu
-- ----------------------------
DROP TABLE IF EXISTS `m_menu`;
CREATE TABLE `m_menu`  (
  `MENU_ID` int(11) NOT NULL,
  `TITLE` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ICON` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `TYPE` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `BADGE_TYPE` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `BADGE_VALUE` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ACTIVE` int(11) NULL DEFAULT 0,
  `PATH` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `BOOKMARK` int(11) NULL DEFAULT 0,
  `PARENT_ID` int(11) NULL DEFAULT NULL,
  `IS_ACTIVE` int(11) NULL DEFAULT 0,
  `CONDITION` int(11) NULL DEFAULT 0,
  `ORDER` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_menu
-- ----------------------------
INSERT INTO `m_menu` VALUES (1, 'Dashboard', 'home', 'link', 'primary', 'new', 0, '/dashboard', 0, NULL, 1, 0, 1);
INSERT INTO `m_menu` VALUES (2, 'Tim Pemenangan', 'users', 'link', NULL, NULL, 0, '/tim-pemenangan', 0, NULL, 1, 0, 3);
INSERT INTO `m_menu` VALUES (3, 'Konstituen', 'edit', 'link', 'primary', 'new', 0, '/konstituen', 0, NULL, 1, 0, 4);
INSERT INTO `m_menu` VALUES (4, 'Real Count', 'clock', 'link', NULL, NULL, 0, '/real-count', 0, NULL, 1, 0, 5);
INSERT INTO `m_menu` VALUES (5, 'Master', 'database', 'sub', 'primary', 'new', 0, '', 0, NULL, 1, 0, 2);
INSERT INTO `m_menu` VALUES (6, 'Kecamatan', NULL, 'link', NULL, NULL, 0, '/master/kecamatan/list', 0, 5, 1, 0, 1);
INSERT INTO `m_menu` VALUES (7, 'Kelurahan', NULL, 'link', NULL, NULL, 0, '/master/kelurahan/list', 0, 5, 1, 0, 2);
INSERT INTO `m_menu` VALUES (8, 'TPS', NULL, 'link', NULL, NULL, 0, '/master/tps/list', 0, 5, 1, 0, 3);

-- ----------------------------
-- Table structure for m_role_type
-- ----------------------------
DROP TABLE IF EXISTS `m_role_type`;
CREATE TABLE `m_role_type`  (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for m_roles
-- ----------------------------
DROP TABLE IF EXISTS `m_roles`;
CREATE TABLE `m_roles`  (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`) USING BTREE,
  INDEX `type_id`(`type_id`) USING BTREE,
  CONSTRAINT `m_roles_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `m_role_type` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for m_setting_column
-- ----------------------------
DROP TABLE IF EXISTS `m_setting_column`;
CREATE TABLE `m_setting_column`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `value` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `naming` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hidden` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_field` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `currency_field` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_setting_column
-- ----------------------------
INSERT INTO `m_setting_column` VALUES (1, 'konstituen', 'no_kk,nik,nama,tempat_lahir,tanggal_lahir,jenis_kelamin,alamat,rt,rw,nama_kecamatan,nama_kelurahan,nama_tps,nama_tim,no_hp', '', 'id_dpt, id_kecamatan, id_kelurahan, id_tps', NULL, NULL);
INSERT INTO `m_setting_column` VALUES (2, 'kecamatan', 'nama_kecamatan', NULL, 'id_kecamatan', NULL, NULL);
INSERT INTO `m_setting_column` VALUES (3, 'kelurahan', 'nama_kelurahan', NULL, 'id_kelurahan', NULL, NULL);
INSERT INTO `m_setting_column` VALUES (4, 'tps', 'nama_tps', NULL, 'id_tps', NULL, NULL);

-- ----------------------------
-- Table structure for m_tim
-- ----------------------------
DROP TABLE IF EXISTS `m_tim`;
CREATE TABLE `m_tim`  (
  `id_tim` int(11) NOT NULL AUTO_INCREMENT,
  `nama_tim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deskripsi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id_tim`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for m_tps
-- ----------------------------
DROP TABLE IF EXISTS `m_tps`;
CREATE TABLE `m_tps`  (
  `id_tps` int(11) NOT NULL AUTO_INCREMENT,
  `nama_tps` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id_tps`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_tps
-- ----------------------------
INSERT INTO `m_tps` VALUES (5, 'TPS-001', NULL);
INSERT INTO `m_tps` VALUES (6, 'TPS-002', NULL);
INSERT INTO `m_tps` VALUES (7, 'TPS-003', NULL);
INSERT INTO `m_tps` VALUES (8, 'TPS-004', NULL);
INSERT INTO `m_tps` VALUES (9, 'TPS-005', NULL);
INSERT INTO `m_tps` VALUES (10, 'TPS-006', NULL);
INSERT INTO `m_tps` VALUES (11, 'TPS-007', NULL);
INSERT INTO `m_tps` VALUES (12, 'TPS-008', NULL);
INSERT INTO `m_tps` VALUES (13, 'TPS-009', NULL);
INSERT INTO `m_tps` VALUES (14, 'TPS-010', NULL);

-- ----------------------------
-- Table structure for m_user
-- ----------------------------
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 0,
  `create_date` date NOT NULL DEFAULT current_timestamp,
  `update_date` date NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of m_user
-- ----------------------------
INSERT INTO `m_user` VALUES (1, 'Developer', '', 'dev@gmail.com', 1, '2020-06-10', '0000-00-00');

-- ----------------------------
-- Table structure for t_assign
-- ----------------------------
DROP TABLE IF EXISTS `t_assign`;
CREATE TABLE `t_assign`  (
  `assign_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_id` int(11) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp,
  `update_id` int(11) NOT NULL,
  `update_date` date NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`assign_id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `t_assign_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `m_roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_assign_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `m_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_kelurahan_tps
-- ----------------------------
DROP TABLE IF EXISTS `t_kelurahan_tps`;
CREATE TABLE `t_kelurahan_tps`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_kelurahan` int(11) NULL DEFAULT NULL,
  `id_tps` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_kelurahan_tps
-- ----------------------------
INSERT INTO `t_kelurahan_tps` VALUES (1, 3, 5);
INSERT INTO `t_kelurahan_tps` VALUES (2, 3, 6);
INSERT INTO `t_kelurahan_tps` VALUES (3, 3, 7);
INSERT INTO `t_kelurahan_tps` VALUES (4, 4, 5);
INSERT INTO `t_kelurahan_tps` VALUES (5, 4, 6);
INSERT INTO `t_kelurahan_tps` VALUES (6, 4, 7);

-- ----------------------------
-- Table structure for t_setting_list
-- ----------------------------
DROP TABLE IF EXISTS `t_setting_list`;
CREATE TABLE `t_setting_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `value` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_date` datetime(0) NULL DEFAULT NULL,
  `update_date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_setting_list
-- ----------------------------
INSERT INTO `t_setting_list` VALUES (4, 'konstituen', 1, '{\"field\":\"nik\",\"order\":1};;{\"field\":\"nama\",\"order\":2};;{\"field\":\"nama_tim\",\"order\":3};;{\"field\":\"nama_kecamatan\",\"order\":4};;{\"field\":\"nama_kelurahan\",\"order\":5};;{\"field\":\"nama_tps\",\"order\":6};;{\"field\":\"no_hp\",\"order\":7}', '2020-08-17 03:14:31', '2020-09-01 20:35:32');
INSERT INTO `t_setting_list` VALUES (5, 'kecamatan', 1, '{\"field\":\"nama_kecamatan\",\"order\":1}', '2020-08-27 00:41:05', NULL);

-- ----------------------------
-- Table structure for t_user_login
-- ----------------------------
DROP TABLE IF EXISTS `t_user_login`;
CREATE TABLE `t_user_login`  (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `login_code` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `login_pass` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `s_pass` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 0,
  `is_dev` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`login_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `t_user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `m_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_login
-- ----------------------------
INSERT INTO `t_user_login` VALUES (1, 1, 'dev@gmail.com', '2b42ab75e6481e9d57023028d1b8535ea35a269e709f7cb226511aedc24e6056', '$2b$10$Od2SO.97EmupMRcG8iOmR.pvVd5FvAil9xpACm917zavXE6PEY52m', 1, 0);

-- ----------------------------
-- View structure for dpt_v
-- ----------------------------
DROP VIEW IF EXISTS `dpt_v`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `dpt_v` AS SELECT
	a.id_dpt,
	a.no_kk,
	a.nik,
	a.nama,
	a.tempat_lahir,
	a.tanggal_lahir,
	a.jenis_kelamin,
	a.alamat,
	a.rt,
	a.rw,
	b.nama_kecamatan,
	a.id_kecamatan,
	c.nama_kelurahan,
	a.id_kelurahan,
	e.nama_tps,
	a.id_tps,
	f.nama_tim,
	a.no_hp
FROM
	m_dpt a
	LEFT JOIN m_kecamatan b ON ( a.id_kecamatan = b.id_kecamatan )
	LEFT JOIN m_kelurahan c ON ( a.id_kecamatan = c.id_kecamatan )
	LEFT JOIN m_tps e ON ( a.id_tps = e.id_tps )
	left join m_tim f ON (a.id_tim = f.id_tim)
ORDER BY b.nama_kecamatan, c.nama_kelurahan asc ;

-- ----------------------------
-- View structure for kecamatan_list
-- ----------------------------
DROP VIEW IF EXISTS `kecamatan_list`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `kecamatan_list` AS SELECT
	kec.id_kecamatan,
	kec.nama_kecamatan,
	count(dpt.id_dpt) as jumlah_dpt
FROM
	m_kecamatan kec
	left join m_dpt dpt on (kec.id_kecamatan = dpt.id_kecamatan) ;

-- ----------------------------
-- View structure for kelurahan_list
-- ----------------------------
DROP VIEW IF EXISTS `kelurahan_list`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `kelurahan_list` AS select 
kec.nama_kecamatan,
a.id_kelurahan,
a.nama_kelurahan,
a.jumlah_tps,
count(dpt.id_dpt) as jumlah_dpt
from
(
	SELECT
	kel.id_kelurahan,
	kel.nama_kelurahan,
	count(tps.nama_tps) jumlah_tps
FROM
	m_kelurahan kel
	left join t_kelurahan_tps t on (kel.id_kelurahan = t.id_kelurahan)
	LEFT JOIN m_tps tps ON ( t.id_tps = tps.id_tps ) 
GROUP BY
	kel.id_kelurahan,
	kel.nama_kelurahan
) a
left join m_dpt dpt on (a.id_kelurahan = dpt.id_kelurahan)
left join m_kecamatan kec on (dpt.id_kecamatan = kec.id_kecamatan)
GROUP BY
a.id_kelurahan,
a.nama_kelurahan,
a.jumlah_tps,
kec.nama_kecamatan ;

SET FOREIGN_KEY_CHECKS = 1;
