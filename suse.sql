/*
 Navicat Premium Data Transfer

 Source Server         : 本机
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 127.0.0.1:3306
 Source Schema         : suse

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 01/02/2024 15:58:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for addition
-- ----------------------------
DROP TABLE IF EXISTS `addition`;
CREATE TABLE `addition`  (
  `hospitalName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `additionDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalLevel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `infoJsonPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`hospitalId`) USING BTREE,
  INDEX `hospitalName`(`hospitalName` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of addition
-- ----------------------------
INSERT INTO `addition` VALUES ('乐山市第一人民医院', 'ls0001', '2022/12/12 14:14:14', '三级甲等', '四川', '四川省', 'http://localhost:3011/hospital/ls0001.json');

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1111111', '11111111');

-- ----------------------------
-- Table structure for fallback
-- ----------------------------
DROP TABLE IF EXISTS `fallback`;
CREATE TABLE `fallback`  (
  `hospitalId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dealStatus` int NOT NULL DEFAULT 0,
  `errors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `hospitalId`(`hospitalId` ASC) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `fallback_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `addition` (`hospitalId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fallback_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fallback
-- ----------------------------
INSERT INTO `fallback` VALUES ('ls0001', 1, '1111111', 'doc0001', '6546515341653');
INSERT INTO `fallback` VALUES ('ls0001', 1, '不知道', 'doc0001', 'c9271a3c-e032-4414-bb2a-c83be40f5b7f');

-- ----------------------------
-- Table structure for patience
-- ----------------------------
DROP TABLE IF EXISTS `patience`;
CREATE TABLE `patience`  (
  `customer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `customerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalLevel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `times` int NOT NULL,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cause` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `depart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prescriptionDrug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `hospitalName`(`hospitalName` ASC) USING BTREE,
  CONSTRAINT `patience_ibfk_1` FOREIGN KEY (`hospitalName`) REFERENCES `addition` (`hospitalName`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of patience
-- ----------------------------
INSERT INTO `patience` VALUES ('秦膶髇', '乐山市第一人民医院', 'csc0001', '三级甲等', '', '2024/1/31 20:54:42', 3, '[\"感冒\",\"流鼻涕\",\"咳嗽\"]', '11111111111111111', '外科', '四川', '我不知道啊', '5dcf4642-0367-46f7-9412-c3f8144a0f66');
INSERT INTO `patience` VALUES ('秦膶髇', '乐山市第一人民医院', 'csc0001', '三级甲等', '', '2024/1/31 20:52:22', 3, '[\"感冒\",\"流鼻涕\",\"咳嗽\"]', '', '外科', '四川', '我不知道啊', 'cebee24c-92de-442b-be7e-1987db84bc6e');
INSERT INTO `patience` VALUES ('秦膶髇', '乐山市第一人民医院', 'csc0001', '三甲医院', '四川省乐山市犍为县', '2024/1/30 22:40:30', 3, '[\"感冒\",\"流鼻涕\",\"咳嗽\"]', '', '外科', '四川', '我不知道啊', 'cfccc9fb-ac90-4c6a-949f-e6043b07cfb5');

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report`  (
  `customer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hospitalName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `depart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `customerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reportPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO `report` VALUES ('秦膶髇', '乐山市第一人民医院', '外科', '2024/1/29 19:26:13', '[\"感冒\",\"流鼻涕\"]', 'csc0001', 'http://localhost:3011/report/invitation.jpg', '294e0634-053e-4899-a399-914208738b72');
INSERT INTO `report` VALUES ('秦膶髇', '乐山市第一人民医院', '外科', '2024/1/29 19:40:24', '[\"感冒\",\"流鼻涕\"]', 'csc0001', 'http://localhost:3011/report/invitation.jpg', '952addf0-d4f8-42db-bed5-6d287f0bc830');
INSERT INTO `report` VALUES ('秦膶髇', '乐山市第一人民医院', '外科', '2024/1/29 19:31:12', '[\"感冒\",\"流鼻涕\"]', 'csc0001', 'http://localhost:3011/report/背面.jpg', 'e0a66526-f789-48f1-b664-dd8c45d40c76');
INSERT INTO `report` VALUES ('秦膶髇', '乐山市第一人民医院', '外科', '2024/1/29 19:28:17', '[\"感冒\",\"流鼻涕\"]', 'csc0001', 'http://localhost:3011/report/Snipaste_2023-10-04_16-24-29.png', 'e9c4c721-5a40-4010-8b99-a5e6e1f31a7a');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatarPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `depart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sciencePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `hospitalId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  INDEX `hospitalId`(`hospitalId` ASC) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `addition` (`hospitalId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('11111111', '11111111', 'http://localhost:3011/avatar/invitation.jpg', '外科', '张三', 'doc0001', 'http://localhost:3011/hospital/doc0001.json', 'ls0001');

SET FOREIGN_KEY_CHECKS = 1;
