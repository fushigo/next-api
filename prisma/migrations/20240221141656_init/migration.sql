-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `NamaLengkap` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Alamat` VARCHAR(191) NOT NULL,
    `Role` ENUM('pengguna', 'petugas', 'admin') NOT NULL DEFAULT 'pengguna',

    UNIQUE INDEX `User_Username_key`(`Username`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `ProfileID` INTEGER NOT NULL AUTO_INCREMENT,
    `JenisKelamin` ENUM('male', 'female', 'other') NOT NULL DEFAULT 'other',
    `TanggalLahir` VARCHAR(191) NULL,
    `Gambar` VARCHAR(191) NULL,
    `Bio` VARCHAR(191) NULL,
    `UserID` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_UserID_key`(`UserID`),
    PRIMARY KEY (`ProfileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
