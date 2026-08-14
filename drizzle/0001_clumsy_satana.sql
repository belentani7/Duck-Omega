CREATE TABLE `activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actorId` int,
	`type` varchar(80) NOT NULL,
	`title` varchar(180) NOT NULL,
	`detail` text,
	`entityType` varchar(48),
	`entityId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `beats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`genre` varchar(80),
	`bpm` int,
	`musicalKey` varchar(16),
	`previewKey` varchar(512),
	`masterKey` varchar(512),
	`description` text,
	`exclusivePriceCents` int NOT NULL DEFAULT 0,
	`nonExclusivePriceCents` int NOT NULL DEFAULT 0,
	`availability` enum('available','reserved','sold') NOT NULL DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `beats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`name` varchar(160) NOT NULL,
	`company` varchar(160),
	`email` varchar(320) NOT NULL,
	`phone` varchar(48),
	`notes` text,
	`healthScore` int NOT NULL DEFAULT 80,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deliverables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`status` enum('pending','in_progress','review','approved') NOT NULL DEFAULT 'pending',
	`dueDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `deliverables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int,
	`clientId` int,
	`uploadedBy` int NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`fileName` varchar(255) NOT NULL,
	`storageKey` varchar(512) NOT NULL,
	`mimeType` varchar(160) NOT NULL,
	`sizeBytes` int NOT NULL DEFAULT 0,
	`sha256` varchar(64) NOT NULL,
	`visibility` enum('private','client') NOT NULL DEFAULT 'private',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`beatId` int NOT NULL,
	`licenseType` enum('exclusive','non_exclusive') NOT NULL,
	`unitPriceCents` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int,
	`buyerEmail` varchar(320) NOT NULL,
	`status` enum('pending','paid','failed','refunded','cancelled') NOT NULL DEFAULT 'pending',
	`provider` varchar(48) NOT NULL DEFAULT 'test',
	`providerPaymentId` varchar(160),
	`totalCents` int NOT NULL DEFAULT 0,
	`contractKey` varchar(512),
	`downloadExpiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paymentEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provider` varchar(48) NOT NULL,
	`eventId` varchar(160) NOT NULL,
	`orderId` int,
	`payload` text NOT NULL,
	`signatureValid` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `paymentEvents_id` PRIMARY KEY(`id`),
	CONSTRAINT `paymentEvents_eventId_unique` UNIQUE(`eventId`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text,
	`status` enum('discovery','in_progress','review','delivered') NOT NULL DEFAULT 'discovery',
	`progress` int NOT NULL DEFAULT 0,
	`revisionLimit` int NOT NULL DEFAULT 2,
	`revisionCount` int NOT NULL DEFAULT 0,
	`startDate` timestamp,
	`dueDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revisionComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`revisionId` int NOT NULL,
	`authorId` int NOT NULL,
	`body` text NOT NULL,
	`timestampMs` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revisionComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`fileId` int,
	`requestedBy` int NOT NULL,
	`status` enum('requested','in_progress','approved','rejected') NOT NULL DEFAULT 'requested',
	`summary` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revisions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('owner','producer','client','user') NOT NULL DEFAULT 'client';